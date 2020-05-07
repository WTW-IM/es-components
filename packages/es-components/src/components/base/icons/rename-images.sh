#!/bin/bash

ORIG=$1;

NEW=$1;
NEW="$(echo $NEW | sed s/_/-/g)";
NEW="$(echo $NEW | sed -E s/-[[:digit:]]+//g)";
NEW="$(echo $NEW | sed -E s/-+/-/g)";
NEW="$(echo $NEW | sed s/icons8-//)";
NEW="$(echo $NEW | sed -E s/^-+//)";
NEW="$(echo $NEW | sed -E 's/-+\././')";

echo "Renaming $ORIG to $NEW";
mv "./full-color-images/$ORIG" "./full-color-images/$NEW";
