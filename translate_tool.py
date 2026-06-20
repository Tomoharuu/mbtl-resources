import pandas as pd
sheet_id = "1NB4V06ASAqhv14sTwAGljLl4xXaMp6ALg-_FJjbHFoc"
url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"
df = pd.read_csv(url)

result = df.set_index('English')['PT-BR'].to_dict()


with open("en.html", "r") as file:
    english = file.read()
with open("index.html", "w") as file:
    file.write(english) 


# 1. Read the file contents into memory
with open("en.html", "r") as file:
    content = file.read()

# 2. Iterate over the dictionary and replace keys with values
for old_word, new_word in result.items():
    content = content.replace(old_word, new_word)

# 3. Write the modified contents back to the file
with open("pt-br.html", "w") as file:
    file.write(content)

result_es = df.set_index('English')['ES'].to_dict()

# 1. Read the file contents into memory
with open("en.html", "r") as file:
    content2 = file.read()

# 2. Iterate over the dictionary and replace keys with values
for old_word_es, new_word_es in result_es.items():
    content2 = content2.replace(old_word_es, str(new_word_es))

# 3. Write the modified contents back to the file
with open("es.html", "w") as file:
    file.write(content2)

print("Concluído!")