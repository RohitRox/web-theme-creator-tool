theme="$1"

if [ -z "$1" ];
  then
    echo 'Theme name not supplied.\nUsage: make theme name=theme-name'
else
  touch "src/js/$theme.js"
  printf "import 'base.scss';\nrequire('../themes/$theme.scss');\nconsole.log('$theme is ready');" >> src/js/$theme.js
  touch "src/themes/$theme.css"
  printf "@import '../css/base.scss';" >> src/themes/$theme.css
fi
