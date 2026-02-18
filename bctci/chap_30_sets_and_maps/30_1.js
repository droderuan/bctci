function account_sharing_detection(connections){
  const seenUser = new Set()

  for (let i=0; i < connections.length-1; i++) {
    const [ip, user] = connections[i]
    if(seenUser.has(user)) {
      return ip
    } else {
      seenUser.add(user)
    }
  }
  return ''
}

const test1 = [
  ["203.0.113.10", "mike"], ["298.51.100.25", "bob"],
  ["292.0.2.5", "mike"], ["203.0.113.15", "bob2"]
]
console.log(test1, account_sharing_detection(test1))

const test2 = [
  ["111.0.0.0", "mike"], ["111.0.0.3", "mike"],
  ["111.0.0.2", "bob"], ["111.0.0.3", "bob"]
]
console.log(test2, account_sharing_detection(test2))

const test3 = [
  ["111.0.0.0", "mike"], ["111.0.0.1", "mike2"],
  ["111.0.0.2", "mike3"], ["111.0.0.4", "mike4"]
]
console.log(test3, account_sharing_detection(test3))
