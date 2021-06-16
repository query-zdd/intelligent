#!/usr/bin/env bash


if [ -n $BROWSER ]; then
  $BROWSER 'http://wwww.google.com'
elif which xdg-open > /dev/null; then
  xdg-open 'http://wwww.google.com'
elif which gnome-open > /dev/null; then
  gnome-open 'http://wwww.google.com'
# elif bla bla bla...
else
  echo "Could not detect the web browser to use."
fi


