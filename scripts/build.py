import json, re
qs=json.load(open('/tmp/parsed.json')); man=json.load(open('scripts/answers_manual.json'))
code={18:"(function executeRule(current, previous /*null when async*/) {\n\n})(current, previous);",
117:"table.None  read  Access Control for users with the admin and itil roles\ntable.*     read  Access Control for users with the admin role\ntable.field3 read Access Control for users with the itil role",
118:"table.None   read  Access Control for users with the admin and itil roles\ntable.field3 read  Access Control for users with the admin role"}
out=[]
for q in qs:
    inferred=False
    if not q['ans']:
        q['ans']=list(man[str(q['id'])]); inferred=True
    m=re.search(r'Choose (two|three|four)',q['q'],re.I)
    n={'two':2,'three':3,'four':4}[m.group(1).lower()] if m else len(q['ans'])
    stem=re.sub(r'\s*\(Choose (two|three|four)\.?\)','',q['q'],flags=re.I).strip()
    d={'id':q['id'],'question':stem,'options':[{'key':o['k'],'text':o['t']} for o in q['opts']],
       'answers':q['ans'],'multi':n>1,'pick':n,'inferred':inferred}
    if q['id'] in code: d['code']=code[q['id']]
    out.append(d)
json.dump(out,open('src/questions.json','w'),indent=1,ensure_ascii=False)
print(len(out),sum(o['inferred'] for o in out),sum(o['multi'] for o in out))
