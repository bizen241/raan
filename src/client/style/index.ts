import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

export interface Theme {
  background: string;
  border: string;
  text: string;
  input: string;
  container: string;
  accent: string;
}

const { default: styled, createGlobalStyle, ThemeProvider } = styledComponents as ThemedStyledComponentsModule<Theme>;

export { styled, createGlobalStyle, ThemeProvider };
