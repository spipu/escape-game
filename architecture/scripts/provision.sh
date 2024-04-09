#!/bin/bash

set -e

bashSource=$(readlink -f "${BASH_SOURCE[0]}")
cd "$(dirname "$bashSource")"
cd ../../

ENV_DO_NOT_GENERATE="yes"
source ./architecture/scripts/include/init.sh

showTitle "Provision"

export DEBIAN_FRONTEND=noninteractive
export LC_ALL=C

source ./architecture/scripts/provision/00-delivery-user.sh
source ./architecture/scripts/provision/01-repo.sh
source ./architecture/scripts/provision/02-upgrade.sh
source ./architecture/scripts/provision/03-packages.sh
source ./architecture/scripts/provision/04-apache.sh

export DEBIAN_FRONTEND=dialog
