theme="$1"

if [ -z "$1" ];
  then
    echo 'Theme name not supplied.\nUsage: make remove name=theme-name'
else
  rm "src/js/$theme.js"
  rm "src/themes/$theme.css"
fi
