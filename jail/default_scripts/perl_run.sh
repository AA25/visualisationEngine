#!/bin/bash
# This file is part of VPL for Moodle - http://vpl.dis.ulpgc.es/
# Script for running Perl language
# Copyright (C) 2012 Juan Carlos Rodríguez-del-Pino
# License http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
# Author Juan Carlos Rodríguez-del-Pino <jcrodriguez@dis.ulpgc.es>

#load common script and check programs
. common_script.sh
check_program perl
if [ "$1" == "version" ] ; then
	echo "#!/bin/bash" > vpl_execution
	echo "perl -v | head -n5" >> vpl_execution
	chmod +x vpl_execution
	exit
fi
cat common_script.sh > vpl_execution
echo "perl -w $VPL_SUBFILE0" >>vpl_execution
chmod +x vpl_execution
