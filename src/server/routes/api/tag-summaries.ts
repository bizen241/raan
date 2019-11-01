import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { TagSummary } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { TagSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { searchLimit, searchOffset } = parseQuery<TagSummary>("TagSummary", req.query);

  const query = await getManager()
    .createQueryBuilder(TagSummaryEntity, "tagSummary")
    .leftJoinAndSelect("tagSummary.tag", "tag")
    .take(searchLimit)
    .skip(searchOffset);

  const [tagSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, tagSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "TagSummary",
  permission: "Guest",
  hasQuery: true
});