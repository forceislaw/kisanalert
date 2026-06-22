import re

with open('supabase/all_districts.sql', 'r') as f:
    lines = f.readlines()

# First line is the INSERT statement
header = lines[0].strip()
data_lines = lines[1:]

seen = set()
unique_data = []

for line in data_lines:
    line = line.strip()
    # Match: ('Name','State',lat,lng),
    match = re.match(r"\('([^']+)',\s*'([^']+)',\s*([\d.]+),\s*([\d.]+)\)\,?", line)
    if match:
        name = match.group(1)
        state = match.group(2)
        key = (name, state)
        if key not in seen:
            seen.add(key)
            unique_data.append(line)
    else:
        unique_data.append(line)  # Keep any non-matching lines

# Write back
with open('supabase/all_districts.sql', 'w') as f:
    f.write(header + '\n')
    f.write('\n'.join(unique_data))
    f.write('\n')

print(f'Original data lines: {len(data_lines)}')
print(f'Unique districts: {len(seen)}')
print(f'Output data lines: {len(unique_data)}')