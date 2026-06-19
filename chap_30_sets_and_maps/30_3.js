function most_frequent_octet(ips){
  const ipConnetions = new Map()
  let mostFrequentOctet = -1

  for (let i=0; i < ips.length-1; i++) {
    const ip = ips[i]
    const firstOctet = ip.split(".")[0]

    if(!ipConnetions.has(firstOctet)) {
      ipConnetions.set(firstOctet, 0)
    }

    const updatedFrequency = ipConnetions.get(firstOctet) + 1
    ipConnetions.set(firstOctet, updatedFrequency)

    if(updatedFrequency > (ipConnetions.get(mostFrequentOctet) || 0)) {
      mostFrequentOctet = firstOctet
    }
  }
  return mostFrequentOctet
}

const test1 = ["203.0.113.10", "298.51.100.25", "292.0.2.5", "203.0.113.15"]
console.log(test1, most_frequent_octet(test1))

const test2 = ["111.0.0.0", "111.0.0.3","111.0.0.2", "113.0.0.3"]
console.log(test2, most_frequent_octet(test2))

const test3 = ["112.0.0.0", "112.0.0.1","111.0.0.2", "111.0.0.4"]
console.log(test3, most_frequent_octet(test3))
