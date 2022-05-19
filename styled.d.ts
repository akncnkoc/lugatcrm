import "styled-components"
import { ThemeType } from "./styles/theme-config";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
