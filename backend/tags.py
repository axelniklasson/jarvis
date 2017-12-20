import arduino

connector = arduino.get_connector()

def read_tag():
    if connector is not None:
        connector.write("READ_TAG")
        tagID = connector.read_line()
        return { "tagID": tagID }

def add_tag(tagID, name):
    try:
        tagIDs = [x.rstrip().split(",")[0] for x in open("tags.txt", "r").readlines()]
    except IOError:
        tagIDs = []

    if tagID not in tagIDs:
        with open("tags.txt", "a+") as tags:
            tags.write(tagID + "," + name + "\n")

def remove_tag(tagID):
    tags = [x.rstrip() for x in open("tags.txt", "r").readlines()]
    
    with open("tags.txt", "w") as f:
        for tag in tags:
            if tagID != tag.split(",")[0]:
                f.write(tag + "\n")

def validate(tagID):
    try:
        tags = [x.rstrip() for x in open("tags.txt", "r").readlines()]
        return tagID in tags
    except IOError:
        return False

def list():
    try:
        tags = [{"tagID": x.rstrip().split(",")[0], "user": x.rstrip().split(",")[1]} for x in open("tags.txt", "r").readlines()]
    except IOError:
        tags = []

    return {"tags": tags}

