---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
archives: {{ now.Format "2006-01" }}
---