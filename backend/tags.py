import arduino

connector = arduino.get_connector()

def read_tag():
    if connector is not None:
        connector.write("READ_TAG")
        tagID = connector.read_line()
        return { "tagID": tagID }

def add_tag(tagID):
    try:
        tags = [x.rstrip() for x in open("tags.txt", "r").readlines()]
    except IOError:
        tags = []

    if tagID not in tags:
        with open("tags.txt", "a+") as tags:
            tags.write(tagID + "\n")

def remove_tag(tagID):
    tags = [x.rstrip() for x in open("tags.txt", "r").readlines()]
    
    with open("tags.txt", "w") as f:
        for tag in tags:
            if tagID != tag:
                f.write(tag + "\n")

def validate(tagID):
    try:
        tags = [x.rstrip() for x in open("tags.txt", "r").readlines()]
        return tagID in tags
    except IOError:
        return False

def list():
    try:
        tags = [{"tagID": x.rstrip(), "user": "John Doe"} for x in open("tags.txt", "r").readlines()]
    except IOError:
        tags = []

    return {"tags": tags}

