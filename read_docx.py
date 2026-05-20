import zipfile
import xml.etree.ElementTree as ET
import sys

def get_docx_text(path):
    document = zipfile.ZipFile(path)
    xml_content = document.read('word/document.xml')
    document.close()
    tree = ET.XML(xml_content)
    paragraphs = []
    for paragraph in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
        texts = [node.text
                 for node in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t')
                 if node.text]
        if texts:
            paragraphs.append(''.join(texts))
    return '\n'.join(paragraphs)

file1 = "asset/Hybrid+CNN+and+LLM+for+Image-Based+Classification+of+Plant+Leaf+Diseases+Frenky.docx"
file2 = "asset/7506-Article Text-25977-2-2-20260126.docx"

try:
    print("--- Hybrid CNN & LLM ---")
    print(get_docx_text(file1)[:1500])
except Exception as e:
    print(e)
    
try:
    print("\n\n--- All CNN Optimizer ---")
    print(get_docx_text(file2)[:1500])
except Exception as e:
    print(e)
