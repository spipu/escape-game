#!/bin/bash

function showMessage() {
    MESSAGE_DATE=$(date +"%Y-%m-%d %H:%M:%S")
    MESSAGE="$1"

    echo "[${MESSAGE_DATE}] ${MESSAGE}"
}

function showError() {
    MESSAGE_DATE=$(date +"%Y-%m-%d %H:%M:%S")
    MESSAGE="$1"

    echo "[${MESSAGE_DATE}] ERROR - ${MESSAGE}"
}

function showTitle() {
    MESSAGE="$1"
    if [[ "$ENV_TYPE" != "none" ]]; then
        MESSAGE="$MESSAGE [$ENV_TYPE]"
    fi

    showMessage "$MESSAGE"
}

function createFromTemplate() {
    FILE_SRC="$1"
    FILE_DST="$2"

    if [[ ! -f "$FILE_SRC" ]]; then
        showError "The source file  does not exist: $FILE_SRC"
        exit 1
    fi

    rm -f "$FILE_DST"
    cp "$FILE_SRC" "$FILE_DST"

    remplaceVariablesInFile "$FILE_DST"
}

function remplaceVariablesInFile() {
    FILE="$1"

    # Env
    remplaceVariableInFile "$FILE" "ENV_NAME"      "$ENV_NAME"
    remplaceVariableInFile "$FILE" "ENV_USER"      "$ENV_USER"
    remplaceVariableInFile "$FILE" "ENV_HOST"      "$ENV_HOST"
    remplaceVariableInFile "$FILE" "ENV_MODE"      "$ENV_MODE"
    remplaceVariableInFile "$FILE" "ENV_NAME"      "$ENV_NAME"
    remplaceVariableInFile "$FILE" "ENV_FOLDER"    "$ENV_FOLDER"
    remplaceVariableInFile "$FILE" "WEB_FOLDER"    "$WEB_FOLDER"
    remplaceVariableInFile "$FILE" "MAIN_FOLDER"   "$MAIN_FOLDER"

    # PHP
    remplaceVariableInFile "$FILE" "PHP_DISPLAY_ERRORS" "$PHP_DISPLAY_ERRORS"
}

function remplaceVariableInFile() {
    FILE="$1"
    CODE="$2"
    VALUE="$3"

    VALUE_SED=$(echo "$VALUE" | sed -e 's/[\/&]/\\&/g')

    sed -i "s/{{$CODE}}/$VALUE_SED/g" "$FILE"
}

# Array in function - check if array $2 contains element $1
function arrayIn() {
    set +e
    local e
    for e in "${@:2}"; do [[ "$e" == "$1" ]] && return 0; done
    return 1 && set -e
}
