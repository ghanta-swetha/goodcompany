/// <reference types="vite/client" />

declare module "*.jsx" {
    const Component: React.ComponentType<any>
    export default Component
  }
  
  declare module "*.jpg"
  declare module "*.png"
  declare module "*.svg"
  
  