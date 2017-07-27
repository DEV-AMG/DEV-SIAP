<?php 

shell_exec('mysqldump -u admin -p mfimfi mfas tx_apk -w="fn_no_apk=170101" > yourtable.sql');

?>