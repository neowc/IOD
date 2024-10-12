#!/bin/bash
rm dummy.zip
#touch dummy.zip
# x=0;
# while [ $x -lt 100000 ];
# do echo a >> dummy.zip;
#   x=`expr $x + 1`;
# done;

for x in {1..10}
do
    #echo a
    OUTPUT_XLSX="pbm_testfile_$x.xlsx"
    #cp my_data_file.xlsx $OUTPUT_XLSX
    ln -s my_data_file.xlsx $OUTPUT_XLSX
    zip a dummy.zip $OUTPUT_XLSX
    rm $OUTPUT_XLSX
done