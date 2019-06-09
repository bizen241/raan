import { AppBar, Card, CardHeader, CircularProgress, DialogContent, IconButton, Toolbar } from "@material-ui/core";
import { Close, Error } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Submission } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { CompiledQuestion, compileQuestions } from "../../../domain/exercise/compiler";
import { createPlan } from "../../../domain/exercise/create";
import { actions, RootState } from "../../../reducers";
import { AttemptResult } from "../renderers/AttemptResult";
import { QuestionPlayer } from "./QuestionPlayer";

export interface Attempt {
  questions: CompiledQuestion[];
  plan: number[];
}

export interface QuestionResult {
  totalTime: number;
  typoMap: any;
  typedLines: string[][];
}

export const ExercisePlayer = React.memo<{
  exerciseId: string;
  questionIndex?: number;
  isPreview?: boolean;
  onClose: () => void;
}>(({ exerciseId, questionIndex, isPreview = false, onClose }) => {
  const dispatch = useDispatch();
  const exercise = useSelector((state: RootState) => {
    if (isPreview) {
      const buffer = state.buffers.Exercise[exerciseId];

      return buffer && buffer.edited;
    } else {
      return state.cache.get.Exercise[exerciseId];
    }
  });

  useEffect(() => {
    if (exercise === undefined && !isPreview) {
      dispatch(actions.api.get("Exercise", exerciseId));
    }
  }, []);

  const [attempt, setAttempt] = useState<Attempt>();
  const [results, updateResults] = useState<QuestionResult[]>([]);

  const resultCount = results.length;
  const isFinished = attempt !== undefined && attempt.plan.length === resultCount;

  useEffect(() => {
    if (exercise !== undefined) {
      const sourceQuestions = exercise.questions || [];
      const selectedQuestions = questionIndex !== undefined ? [sourceQuestions[questionIndex]] : sourceQuestions;

      setAttempt({
        questions: compileQuestions(selectedQuestions),
        plan: createPlan(selectedQuestions)
      });
    }
  }, [exercise]);
  useEffect(() => {
    if (isFinished && !isPreview && attempt !== undefined) {
      const submissionId = Date.now().toString();
      const submission: SaveParams<Submission> = {
        exerciseId,
        time: 10,
        accuracy: 100
      };

      dispatch(actions.buffers.add("Submission", submissionId, submission));
      dispatch(actions.api.upload("Submission", submissionId));
    }
  }, [isFinished]);

  const onNext = useCallback((result: QuestionResult) => updateResults(s => [...s, result]), []);

  if (exercise === undefined && isPreview) {
    return (
      <MessageContainer onClose={onClose}>
        <CardHeader avatar={<Error />} title="バッファが見つかりませんでした" />
      </MessageContainer>
    );
  }

  if (exercise === undefined || attempt === undefined) {
    return (
      <MessageContainer onClose={onClose}>
        <CardHeader avatar={<CircularProgress />} title="ロード中です" />
      </MessageContainer>
    );
  }

  const { questions, plan } = attempt;

  if (questions.length === 0) {
    return (
      <MessageContainer onClose={onClose}>
        <CardHeader avatar={<Error />} title="空の問題集です" />
      </MessageContainer>
    );
  }

  if (isFinished) {
    return (
      <>
        <AppBar position="relative">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <AttemptResult attempt={attempt} results={results} />
        </DialogContent>
      </>
    );
  }

  const currentQuestionIndex = plan[resultCount];
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <AppBar position="relative">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <QuestionPlayer key={resultCount} question={currentQuestion} onFinish={onNext} />
      </DialogContent>
    </>
  );
});

const MessageContainer = React.memo<{ onClose: () => void; children: React.ReactNode }>(({ onClose, children }) => (
  <>
    <AppBar position="relative">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" onClick={onClose}>
          <Close />
        </IconButton>
      </Toolbar>
    </AppBar>
    <DialogContent>
      <Card>{children}</Card>
    </DialogContent>
  </>
));
