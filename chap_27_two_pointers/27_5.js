const lowerCaseRegex = /[a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,x,y,z]/
const upperCaseRegex = /[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,X,Y,Z]/

// my solution. I think it is easier to understand, but it consumes more memory than the books's solution.
// time complexity O(N) space complexity O(N)
function _reverse_case_match(s) {
  const lowerWord = []
  const upperWord = []

  for (let i=0; i < s.length; i++) {
    if(s[i].match(lowerCaseRegex)) {
      lowerWord.push(s[i])
    } else if (s[i].match(upperCaseRegex)) {
      upperWord.push(s[i])
    } else {
      return false
    }
  }

  let [left, right] = [0, lowerWord.length-1]

  while (left < right) {
    if(lowerWord[left] === upperWord[right].toLowerCase()) {
      left++
      right--
      continue
    }
    return false
  }
  return true
}

// books's solution. It has a better memory consume than my solution.
// The insight here is that each pointer focus on one specific pattern.
// Left focus on lower characters, while right focus on upper characters.
// time complexity O(N) space complexity O(1)
function reverse_case_match(s) {
  let [left, right] = [0, s.length-1]

  while (left < right) {
    if(!s[left].match(lowerCaseRegex)) {
      left++
      continue
    }
    if(!s[right].match(upperCaseRegex)) {
      right--
      continue
    }

    if(s[left] !== s[right].toLowerCase()) {
      return false
    }
    left++
    right--
  }
  return true
}



const test1 = "ruaNAnUR"
console.log(test1, reverse_case_match(test1))

const test2 = "haDrRAHd"
console.log(test2, reverse_case_match(test2))

const test3 = "haDrARDd"
console.log(test3, reverse_case_match(test3))

const test4 = ""
console.log(test4, reverse_case_match(test4))
