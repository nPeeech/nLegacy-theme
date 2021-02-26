---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
archives: {{ now.Format "2006-01" }}
---