import sys
import re
# convert vtt to srt and add missing cue id
# written by eirik.hanssen@hioa.no
# print 'Num of arguments: ', len(sys.argv), 'arguments.'
# print 'Argument list:', str(sys.argv)

f=open(sys.argv[1], 'r')
cuecounter = 0

timecode_search = re.compile("\d+:\d+:\d+")
timecode_fix = re.compile("(\d+:\d+:\d+)[.](\d+ --> \d+:\d+:\d+)[.](\d+)(.+)")
output_string = ""

for line in f:
    if timecode_search.match(line):
        cuecounter += 1
        if(cuecounter > 1):
            output_string += "\n\n"
        output_string += str(cuecounter)
        m = timecode_fix.match(line)
        newtimecode = m.group(1) + ',' + m.group(2) + ',' + m.group(3)
        output_string += "\n" + newtimecode.rstrip()
    else:
        if cuecounter > 0:
            if(line.strip() != ''):
                output_string += "\n" + line.rstrip()

f.close()
print(output_string)
