
export type Language = 'javascript' | 'html' | 'css' | 'java' | 'cpp';
export type Theme = 'oneDark' | 'githubLight';

export const languages = [
  {
    label: 'JavaScript',
    value: 'javascript',
    id: 63,
    initialCode: `
console.log('Hello, World!');
`,
    executable: true
  },
  {
    label: 'Java',
    value: 'java',
    id: 62,
    initialCode: `
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
`,
    executable: true
  },
  {
    label: 'C++',
    value: 'cpp',
    id: 54,
    initialCode: `
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!";
  return 0;
}
`,
    executable: true
  },
  {
    label: 'Python',
    value: 'python',
    id: 71,
    initialCode: `
print('Hello, World!')
`,
    executable: true
  },
  {
    label: 'HTML',
    value: 'html',
    initialCode: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Code Meet</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
`,
    executable: false
  },
  {
    label: 'CSS',
    value: 'css',
    initialCode: `
body {
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
  color: #333;
}

h1 {
  color: #007acc;
}
`,
    executable: false
  }
];

export const themes = [
  {
    label: 'Github Light',
    value: 'githubLight'
  },
  {
    label: 'One Dark',
    value: 'oneDark'
  }
];
