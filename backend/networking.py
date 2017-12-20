import subprocess
import os

# Static IP hostname mapping as fallback
static_hostnames = {}
static_hostnames["192.168.0.100"] = "Apple TV"
static_hostnames["192.168.0.101"] = "Axels MacBook Pro"
static_hostnames["192.168.0.107"] = "Sony Xperia"
static_hostnames["192.168.0.103"] = "Axels iPhone"
static_hostnames["192.168.0.123"] = "Raspberry Pi 2"

# Uses nmap and arp to find information regarding active hosts on the network
# NOTE: this method requires the result of the command network_scan.sh
#       and the script must be always run at the same time as this server
#
# Returns dictionary with MAC address as key and IP as value
def get_active_hosts():
    abort(500)

    result = open(os.getcwd() + "/backend/network_scan_results.txt").read()
    hosts = []
    for line in result.splitlines():
        for word in line.split(" "):
            # Don't add router to list, it's obviously online
            if "192" in word and word != "192.168.0.1":
                # Get MAC address and add to host dict
                word = word.replace("(", "").replace(")", "")
                arp_result = subprocess.check_output(["arp", word])

                hostname = arp_result.split(" ")[0]
                if hostname == "?" and word in static_hostnames:
                    hostname = static_hostnames[word]
                mac_address = arp_result.split(" at ")[1].split(" on ")[0]

                if mac_address != "(incomplete)":
                    host = { "hostname": hostname, "mac_address": mac_address, "ip_address": word }
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


