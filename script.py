import json
import unicodedata

def normalize_str(s):
    # Normalize Unicode string to NFKD form, remove diacritics, and encode to ASCII ignoring errors
    return ''.join(
        c for c in unicodedata.normalize('NFKD', s)
        if not unicodedata.combining(c)
    )

def normalize_obj(obj):
    # Recursively normalize strings inside the JSON object (keys and values if string)
    if isinstance(obj, dict):
        return {normalize_str(k): normalize_obj(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [normalize_obj(elem) for elem in obj]
    elif isinstance(obj, str):
        return normalize_str(obj)
    else:
        return obj

def convert_json_object_to_array(input_json):
    if not isinstance(input_json, dict):
        raise ValueError("Top-level JSON must be an object (dictionary).")

    converted = []
    for obj in input_json.values():
        if isinstance(obj, dict) and "id" in obj:
            obj["_id"] = obj.pop("id")  # Rename 'id' to '_id'
        converted.append(obj)
    return converted

def main():
    output_file = "dataset.json"

    with open("dataset_original.json", 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Normalize entire JSON data before conversion
    data = normalize_obj(data)

    result = convert_json_object_to_array(data)

    if output_file:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=4, ensure_ascii=False)
        print(f"Converted data saved to {output_file}")
    else:
        print(json.dumps(result, indent=4, ensure_ascii=False))

if __name__ == "__main__":
    main()
