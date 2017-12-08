import subprocess

# Uses nmap and arp to find information regarding active hosts on the network
#
# Returns dictionary with MAC address as key and IP as value
def get_active_hosts():
    result = subprocess.check_output(["nmap", "-sP", "192.168.0.0/24"])
    hosts = []
    for line in result.splitlines():
        for word in line.split(" "):
            # Don't add router to list, it's obviously online
            if "192" in word and word != "192.168.0.1":
                # Get MAC address and add to host dict
                mac_address = subprocess.check_output(["arp", word]).split(" at ")[1].split(" on ")[0]
                host = { "hostname": "?", "mac_address": mac_address, "ip_address": word }
                hosts.append(host)
    return hosts

# Checks if a host with specified MAC address if online on network or not
#
# param: mac_address - string representation of MAC address
#
# Return true if host with MAC address can be found on the network
def is_online(mac_address):
    try:
        ps = subprocess.Popen(('arp', '-a'), stdout=subprocess.PIPE)
        output = subprocess.check_output(('grep', mac_address), stdin=ps.stdout)
        return len(output.splitlines()) == 1
    except:
        return False

