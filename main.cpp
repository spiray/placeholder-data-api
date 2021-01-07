#include <math.h>

using namespace std;

bool isPalindrome(string str)
{
    int word_length = floor(str.length() / 2);
    string first = str.substr(0, word_length);
    string second = str.substr(word_length + (str.length() % 2));
    return false;
}

// export function isPalindrome(string: string) {
// 	const wordLength = Math.floor(string.length / 2);
// 	const first = string.slice(0, wordLength);
// 	const second = string
// 		.slice(wordLength + (string.length % 2))
// 		.split('')
// 		.reverse()
// 		.join('');
// 	return first === second;
// }