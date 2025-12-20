export interface LanguageRoute {
  name: string;
  path?: string;
  children?: LanguageRoute[];
}

export const languageRoutes: LanguageRoute[] = [
  {
    "name": "Hindi",
    "children": [
      {
        "name": "Translator",
        "path": "/hindi/translator"
      },
      {
        "name": "Interpreter",
        "path": "/hindi/interpreter"
      }
    ]
  },
  {
    "name": "Punjabi",
    "children": [
      {
        "name": "Translator",
        "path": "/punjabi/translator"
      },
      {
        "name": "Interpreter",
        "path": "/punjabi/interpreter"
      }
    ]
  },
  {
    "name": "Kannad",
    "children": [
      {
        "name": "Translator",
        "path": "/kannad/translator"
      },
      {
        "name": "Interpreter",
        "path": "/kannad/interpreter"
      }
    ]
  },
  {
    "name": "Korean",
    "children": [
      {
        "name": "Translator",
        "path": "/korean/translator"
      },
      {
        "name": "Interpreter",
        "path": "/korean/interpreter"
      }
    ]
  }
];
