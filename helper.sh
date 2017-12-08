# Continously scan network for devices
# Run this alongside backend

echo "Running network scan for active hosts.."

if [ ! -f backend/network_scan_results.txt ]; then
	nmap -sP 192.168.0.0/24 >> backend/network_scan_results.txt
fi

while :
do
	nmap -sP 192.168.0.0/24 >> backend/network_scan_results_new.txt
	
	if [ $(wc -l < backend/network_scan_results_new.txt) -ne $(wc -l < backend/network_scan_results.txt) ]; then
		rm backend/network_scan_results.txt
		mv backend/network_scan_results_new.txt backend/network_scan_results.txt
	fi
done
