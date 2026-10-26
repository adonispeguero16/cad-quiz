import re, json, sys
t = open('/tmp/q.txt', encoding='utf8').read().replace('\u200b','').replace('\f','\n')
t = t.replace('ג€TMs','’s').replace('ג€™','’').replace('λ€™','’')
lines = [l.strip() for l in t.split('\n')]
qs, cur = [], None
qstart = re.compile(r"^[‘']?\s*(\d{1,3})\.\s*(.*)$")
opt = re.compile(r"^([A-H])\.\s*(.*)$")
fixed=[]
for l in lines:
    l=re.sub(r'(?<=[a-z\)])(?=[A-H]\.\s[A-Za-z<])', '\n', l)
    fixed.extend(l.split('\n'))
lines=fixed
for l in lines:
    if not l: 
        continue
    m = qstart.match(l)
    if m and (cur is None or int(m.group(1)) == cur['id']+1):
        cur = {'id':int(m.group(1)),'q':m.group(2),'opts':[],'ans':[]}; qs.append(cur); continue
    if cur is None: continue
    o = opt.match(l)
    if o and (len(cur['opts'])==0 and o.group(1)=='A' or cur['opts'] and ord(o.group(1))==ord(cur['opts'][-1]['k'])+1):
        txt=o.group(2)
        cur['opts'].append({'k':o.group(1),'t':txt}); continue
    if cur['opts']: cur['opts'][-1]['t'] += ' '+l
    else: cur['q'] += ('\n' if re.match(r'^[a-d]\)',l) else ' ')+l
for q in qs:
    for o in q['opts']:
        # option text may contain a trailing next-option letter glued (e.g. "dC.")
        if 'Most Voted' in o['t']:
            q['ans'].append(o['k']); o['t']=o['t'].replace('Most Voted','').strip()
        o['t']=re.sub(r'\s+',' ',o['t']).strip()
    q['q']=re.sub(r'[ \t]+',' ',q['q']).strip()
json.dump(qs, open('/tmp/parsed.json','w'), indent=1)
print(len(qs), 'questions')
print('no answer:', [q['id'] for q in qs if not q['ans']])
print('few opts:', [(q['id'],len(q['opts'])) for q in qs if len(q['opts'])<4])
print('multi:', [q['id'] for q in qs if re.search(r'Choose (two|three|four)',q['q'])])
