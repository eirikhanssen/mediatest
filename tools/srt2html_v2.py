import sys
import re
# convert srt to html-fragments with spans, and the begin and end timecodes in data-begin and data-end attibutes.
# example:
# input: 
#
# 1
# 00:00:00,000 --> 00:00:03,320
# Det kommer et romskip
#
# output:
# <span class="line" data-line="1" data-begin="00:00:00.000" data-end="00:00:03.320">Det kommer et romskip.</span>
#
#
#
# written by eirik.hanssen@hioa.no
# print 'Num of arguments: ', len(sys.argv), 'arguments.'
# print 'Argument list:', str(sys.argv)

f=open(sys.argv[1], 'r')
cuecounter = 0
chaptercounter = 1
current_line = ""
closepara = False

timecode_search = re.compile("(\d+:\d+:\d+),(\d+)")
timecode_fix = re.compile("(\d+:\d+:\d+),(\d+) --> (\d+:\d+:\d+),(\d+)")
endpara = re.compile("(.+)#$")
cue_id_search = re.compile("^\d+#?$")
output_string = "<article class=\"audio_and_text\" data-lang=\"__\">\n<audio class=\"mejs__player\">\n    <source src=\"file.mp3\" type=\"audio/mp3\"/>\n    <source src=\"file.ogg\" type=\"audio/ogg\"/>\n    <track kind=\"captions\" src=\"file.vtt\" srclang=\"_\" label=\"_\"/>\n</audio>\n<div class=\"cues\">\n"
output_string += '<p><span'
for line in f:
    if cue_id_search.match(line):
        chaptercounter += 1
        output_string += ' <span'
    if timecode_search.match(line):
        cuecounter += 1
        m = timecode_fix.match(line)
        output_string += ' data-begin="' + m.group(1) + '.' + m.group(2) + '" data-end="'  + m.group(3) + '.' + m.group(4) + '">'
    else:
        if not (cue_id_search.match(line)):
            if not (line.strip() == ''):
                if endpara.match(line):
                    closepara = True
                    endpara_match = endpara.match(line)
		    line = endpara_match.group(1)
                if cuecounter > 0:
                    output_string += line.rstrip() + '</span>'
		if closepara == True:
		    output_string += '</p>' + "\n\n" + '<p>';
                    closepara = False
f.close()
output_string += '</p>'
output_string += '    \n</div><!-- cues -->\n</article>'
print(output_string)
