# peacekeeper
Asynchronous Processing Framework

## Theory Of Operation

- A list of data is required, it will be uniformly processed.

## Example Run Profile

```
Module Main
  Module makeSo
    Module Save Record
      Module Initialize Record
        Module Test Raw Integrity
          Module Ensure Base Dirs
      Module Process Data
        Module Process Yaml
        Module Process Md
        Module Process Html
      Module Ensure Data
        Module Ensure Bootstrap
        Module Ensure Print
        Module Ensure Text
        Module Ensure Images
        Module Ensure Links
      Module Validate Record Schema
      Module Verify Cache Integrity
    Module Process Images
      Module Process Thumbnails
        Module Download YouTube Thumbnails
        Module Create Cover From Thumbnails
      Module Resize Cover Images
      Module Verify Presence Of Images
  Module Validate So Schema
  Module Copy Data
    Module Copy Attachments
    Module Copy Local Links
    Module Copy Images
    Module Copy Narrations
  Module Make Website
    Module Create Mirror
    Module Create Website
    Module Verify Website
  Module Publish
    Module Publish Mirrors
      Module Publish Mirror Website To Github
    Module Publish Main Websites
      Module Publish Main Website To Github
      Module Publish Main Website To Vercel
      Module Publish Main Website To Surge

```

## Todo

- Work Queue
- Progress Bars (progress promises?)
