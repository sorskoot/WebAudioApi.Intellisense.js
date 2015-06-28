# Visual Studio Intellisense for the WebAudioApi

## Getting Started
To get intellisense working for the JavaScript Web Audio Api you do one of the following:

1) add the file to your project and reference it in the .js files that need it. Do this with a special comment like:

/// &lt;reference path="webaudio.intellisense.js" /&gt;

2) In the options of Visual Studio go to TextEditor->JavaScript->Intellisense->Reference and add the file there. I added it to the general group so I can use it in websites and in apps.

## Note
The documentation used for the intellisense is based on the latest draft from the W3C as available on http://webaudio.github.io/web-audio-api/. This seems to be equivalent to what is currently available in Charkra in Microsoft Edge and Windows 10.
