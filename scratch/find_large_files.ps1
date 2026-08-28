Get-ChildItem -Path public -Recurse -File | Where-Object { $_.Length -gt 1mb } | Select-Object FullName, Length | Format-Table -AutoSize
