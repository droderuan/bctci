function most_shared_account(connections){
  const userConnections = new Map()

  let mostSharedUser = ''

  for (let i=0; i < connections.length-1; i++) {
    const [_ip, user] = connections[i]
    if(!userConnections.has(user)) {
      userConnections.set(user, 0)
    }

    const updatedSum = userConnections.get(user) + 1
    userConnections.set(user, updatedSum)

    if(updatedSum > (userConnections.get(mostSharedUser) || 0)) {
      mostSharedUser = user
    }
  }
  return mostSharedUser
}

const test1 = [
  ["203.0.113.10", "mike"], ["298.51.100.25", "bob"],
  ["292.0.2.5", "mike"], ["203.0.113.15", "bob2"]
]
console.log(test1, most_shared_account(test1))

const test2 = [
  ["111.0.0.0", "bob"], ["111.0.0.3", "mike"],
  ["111.0.0.2", "bob"], ["111.0.0.3", "bob"]
]
console.log(test2, most_shared_account(test2))

const test3 = [
  ["111.0.0.0", "mike"], ["111.0.0.1", "mike2"],
  ["111.0.0.2", "mike3"], ["111.0.0.4", "mike4"]
]
console.log(test3, most_shared_account(test3))
