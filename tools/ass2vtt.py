import sys
import re
import string
# convert ass timings (aegisub text timing format) to vtt
# if line doesnt start with "Dialogue:", discard it
# when encountering a backslash in the dialogue, split into new line
# each line will be a html paragraph element: <p>...</p>
# each cue will be wrapped in a <div class="key" data-key="cue-id">...</div>

f=open(sys.argv[1], 'r')
cuecounter = 1

dialogue_search = re.compile("^Dialogue: \d")
dialogue_extract = re.compile("^Dialogue: \d,(\d:\d\d:\d\d.\d\d),(\d:\d\d:\d\d.\d\d),Default,,\d,\d,\d,,(.+)$")

output_string = "WEBVTT \n\n\n"
for line in f:
    if dialogue_search.match(line):
        matches=dialogue_extract.match(line)
        dialogue_single_line = matches.group(3)
        dialogue_lines = string.split(dialogue_single_line, '\\')
        dialogue_multi_line_markup = ""
        for single_line in dialogue_lines:
            dialogue_multi_line_markup += "<p>" + single_line + "</p>\n"
        start="0" + matches.group(1) + "0"
        stop="0" + matches.group(2) + "0"
        timecode = start + " --> " + stop
        output_string += str(cuecounter) + "\n"
        output_string += timecode + "\n"
        output_string += '<div class="key" data-key="' + str(cuecounter) + '">' + "\n"
        output_string += dialogue_multi_line_markup
        output_string += "</div>\n\n"
        cuecounter += 1
f.close()
print(output_string)
