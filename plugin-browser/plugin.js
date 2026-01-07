(function(exports) {

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion

//#region solid-js/web
var require_web = __commonJS({ "solid-js/web"(exports, module) {
	module.exports = shelter.solidWeb;
} });

//#endregion
//#region node_modules/.pnpm/fuzzysort@3.1.0/node_modules/fuzzysort/fuzzysort.js
var require_fuzzysort = __commonJS({ "node_modules/.pnpm/fuzzysort@3.1.0/node_modules/fuzzysort/fuzzysort.js"(exports, module) {
	((root, UMD) => {
		if (typeof define === "function" && define.amd) define([], UMD);
else if (typeof module === "object" && module.exports) module.exports = UMD();
else root["fuzzysort"] = UMD();
	})(exports, (_) => {
		"use strict";
		var single = (search, target) => {
			if (!search || !target) return NULL;
			var preparedSearch = getPreparedSearch(search);
			if (!isPrepared(target)) target = getPrepared(target);
			var searchBitflags = preparedSearch.bitflags;
			if ((searchBitflags & target._bitflags) !== searchBitflags) return NULL;
			return algorithm(preparedSearch, target);
		};
		var go = (search, targets, options) => {
			if (!search) return options?.all ? all(targets, options) : noResults;
			var preparedSearch = getPreparedSearch(search);
			var searchBitflags = preparedSearch.bitflags;
			var containsSpace = preparedSearch.containsSpace;
			var threshold = denormalizeScore(options?.threshold || 0);
			var limit = options?.limit || INFINITY;
			var resultsLen = 0;
			var limitedCount = 0;
			var targetsLen = targets.length;
			function push_result(result$1) {
				if (resultsLen < limit) {
					q.add(result$1);
					++resultsLen;
				} else {
					++limitedCount;
					if (result$1._score > q.peek()._score) q.replaceTop(result$1);
				}
			}
			if (options?.key) {
				var key = options.key;
				for (var i = 0; i < targetsLen; ++i) {
					var obj = targets[i];
					var target = getValue(obj, key);
					if (!target) continue;
					if (!isPrepared(target)) target = getPrepared(target);
					if ((searchBitflags & target._bitflags) !== searchBitflags) continue;
					var result = algorithm(preparedSearch, target);
					if (result === NULL) continue;
					if (result._score < threshold) continue;
					result.obj = obj;
					push_result(result);
				}
			} else if (options?.keys) {
				var keys = options.keys;
				var keysLen = keys.length;
				outer: for (var i = 0; i < targetsLen; ++i) {
					var obj = targets[i];
					{
						var keysBitflags = 0;
						for (var keyI = 0; keyI < keysLen; ++keyI) {
							var key = keys[keyI];
							var target = getValue(obj, key);
							if (!target) {
								tmpTargets[keyI] = noTarget;
								continue;
							}
							if (!isPrepared(target)) target = getPrepared(target);
							tmpTargets[keyI] = target;
							keysBitflags |= target._bitflags;
						}
						if ((searchBitflags & keysBitflags) !== searchBitflags) continue;
					}
					if (containsSpace) for (let i$1 = 0; i$1 < preparedSearch.spaceSearches.length; i$1++) keysSpacesBestScores[i$1] = NEGATIVE_INFINITY;
					for (var keyI = 0; keyI < keysLen; ++keyI) {
						target = tmpTargets[keyI];
						if (target === noTarget) {
							tmpResults[keyI] = noTarget;
							continue;
						}
						tmpResults[keyI] = algorithm(
							preparedSearch,
							target,
							/*allowSpaces=*/
							false,
							/*allowPartialMatch=*/
							containsSpace
);
						if (tmpResults[keyI] === NULL) {
							tmpResults[keyI] = noTarget;
							continue;
						}
						if (containsSpace) for (let i$1 = 0; i$1 < preparedSearch.spaceSearches.length; i$1++) {
							if (allowPartialMatchScores[i$1] > -1e3) {
								if (keysSpacesBestScores[i$1] > NEGATIVE_INFINITY) {
									var tmp = (keysSpacesBestScores[i$1] + allowPartialMatchScores[i$1]) / 4;
									if (tmp > keysSpacesBestScores[i$1]) keysSpacesBestScores[i$1] = tmp;
								}
							}
							if (allowPartialMatchScores[i$1] > keysSpacesBestScores[i$1]) keysSpacesBestScores[i$1] = allowPartialMatchScores[i$1];
						}
					}
					if (containsSpace) {
						for (let i$1 = 0; i$1 < preparedSearch.spaceSearches.length; i$1++) if (keysSpacesBestScores[i$1] === NEGATIVE_INFINITY) continue outer;
					} else {
						var hasAtLeast1Match = false;
						for (let i$1 = 0; i$1 < keysLen; i$1++) if (tmpResults[i$1]._score !== NEGATIVE_INFINITY) {
							hasAtLeast1Match = true;
							break;
						}
						if (!hasAtLeast1Match) continue;
					}
					var objResults = new KeysResult(keysLen);
					for (let i$1 = 0; i$1 < keysLen; i$1++) objResults[i$1] = tmpResults[i$1];
					if (containsSpace) {
						var score = 0;
						for (let i$1 = 0; i$1 < preparedSearch.spaceSearches.length; i$1++) score += keysSpacesBestScores[i$1];
					} else {
						var score = NEGATIVE_INFINITY;
						for (let i$1 = 0; i$1 < keysLen; i$1++) {
							var result = objResults[i$1];
							if (result._score > -1e3) {
								if (score > NEGATIVE_INFINITY) {
									var tmp = (score + result._score) / 4;
									if (tmp > score) score = tmp;
								}
							}
							if (result._score > score) score = result._score;
						}
					}
					objResults.obj = obj;
					objResults._score = score;
					if (options?.scoreFn) {
						score = options.scoreFn(objResults);
						if (!score) continue;
						score = denormalizeScore(score);
						objResults._score = score;
					}
					if (score < threshold) continue;
					push_result(objResults);
				}
			} else for (var i = 0; i < targetsLen; ++i) {
				var target = targets[i];
				if (!target) continue;
				if (!isPrepared(target)) target = getPrepared(target);
				if ((searchBitflags & target._bitflags) !== searchBitflags) continue;
				var result = algorithm(preparedSearch, target);
				if (result === NULL) continue;
				if (result._score < threshold) continue;
				push_result(result);
			}
			if (resultsLen === 0) return noResults;
			var results = new Array(resultsLen);
			for (var i = resultsLen - 1; i >= 0; --i) results[i] = q.poll();
			results.total = resultsLen + limitedCount;
			return results;
		};
		var highlight = (result, open = "<b>", close = "</b>") => {
			var callback = typeof open === "function" ? open : undefined;
			var target = result.target;
			var targetLen = target.length;
			var indexes = result.indexes;
			var highlighted = "";
			var matchI = 0;
			var indexesI = 0;
			var opened = false;
			var parts = [];
			for (var i = 0; i < targetLen; ++i) {
				var char = target[i];
				if (indexes[indexesI] === i) {
					++indexesI;
					if (!opened) {
						opened = true;
						if (callback) {
							parts.push(highlighted);
							highlighted = "";
						} else highlighted += open;
					}
					if (indexesI === indexes.length) {
						if (callback) {
							highlighted += char;
							parts.push(callback(highlighted, matchI++));
							highlighted = "";
							parts.push(target.substr(i + 1));
						} else highlighted += char + close + target.substr(i + 1);
						break;
					}
				} else if (opened) {
					opened = false;
					if (callback) {
						parts.push(callback(highlighted, matchI++));
						highlighted = "";
					} else highlighted += close;
				}
				highlighted += char;
			}
			return callback ? parts : highlighted;
		};
		var prepare = (target) => {
			if (typeof target === "number") target = "" + target;
else if (typeof target !== "string") target = "";
			var info = prepareLowerInfo(target);
			return new_result(target, {
				_targetLower: info._lower,
				_targetLowerCodes: info.lowerCodes,
				_bitflags: info.bitflags
			});
		};
		var cleanup = () => {
			preparedCache.clear();
			preparedSearchCache.clear();
		};
		class Result {
			get ["indexes"]() {
				return this._indexes.slice(0, this._indexes.len).sort((a, b) => a - b);
			}
			set ["indexes"](indexes) {
				return this._indexes = indexes;
			}
			["highlight"](open, close) {
				return highlight(this, open, close);
			}
			get ["score"]() {
				return normalizeScore(this._score);
			}
			set ["score"](score) {
				this._score = denormalizeScore(score);
			}
		}
		class KeysResult extends Array {
			get ["score"]() {
				return normalizeScore(this._score);
			}
			set ["score"](score) {
				this._score = denormalizeScore(score);
			}
		}
		var new_result = (target, options) => {
			const result = new Result();
			result["target"] = target;
			result["obj"] = options.obj ?? NULL;
			result._score = options._score ?? NEGATIVE_INFINITY;
			result._indexes = options._indexes ?? [];
			result._targetLower = options._targetLower ?? "";
			result._targetLowerCodes = options._targetLowerCodes ?? NULL;
			result._nextBeginningIndexes = options._nextBeginningIndexes ?? NULL;
			result._bitflags = options._bitflags ?? 0;
			return result;
		};
		var normalizeScore = (score) => {
			if (score === NEGATIVE_INFINITY) return 0;
			if (score > 1) return score;
			return Math.E ** (((-score + 1) ** .04307 - 1) * -2);
		};
		var denormalizeScore = (normalizedScore) => {
			if (normalizedScore === 0) return NEGATIVE_INFINITY;
			if (normalizedScore > 1) return normalizedScore;
			return 1 - Math.pow(Math.log(normalizedScore) / -2 + 1, 23.218017181332716);
		};
		var prepareSearch = (search) => {
			if (typeof search === "number") search = "" + search;
else if (typeof search !== "string") search = "";
			search = search.trim();
			var info = prepareLowerInfo(search);
			var spaceSearches = [];
			if (info.containsSpace) {
				var searches = search.split(/\s+/);
				searches = [...new Set(searches)];
				for (var i = 0; i < searches.length; i++) {
					if (searches[i] === "") continue;
					var _info = prepareLowerInfo(searches[i]);
					spaceSearches.push({
						lowerCodes: _info.lowerCodes,
						_lower: searches[i].toLowerCase(),
						containsSpace: false
					});
				}
			}
			return {
				lowerCodes: info.lowerCodes,
				_lower: info._lower,
				containsSpace: info.containsSpace,
				bitflags: info.bitflags,
				spaceSearches
			};
		};
		var getPrepared = (target) => {
			if (target.length > 999) return prepare(target);
			var targetPrepared = preparedCache.get(target);
			if (targetPrepared !== undefined) return targetPrepared;
			targetPrepared = prepare(target);
			preparedCache.set(target, targetPrepared);
			return targetPrepared;
		};
		var getPreparedSearch = (search) => {
			if (search.length > 999) return prepareSearch(search);
			var searchPrepared = preparedSearchCache.get(search);
			if (searchPrepared !== undefined) return searchPrepared;
			searchPrepared = prepareSearch(search);
			preparedSearchCache.set(search, searchPrepared);
			return searchPrepared;
		};
		var all = (targets, options) => {
			var results = [];
			results.total = targets.length;
			var limit = options?.limit || INFINITY;
			if (options?.key) for (var i = 0; i < targets.length; i++) {
				var obj = targets[i];
				var target = getValue(obj, options.key);
				if (target == NULL) continue;
				if (!isPrepared(target)) target = getPrepared(target);
				var result = new_result(target.target, {
					_score: target._score,
					obj
				});
				results.push(result);
				if (results.length >= limit) return results;
			}
else if (options?.keys) for (var i = 0; i < targets.length; i++) {
				var obj = targets[i];
				var objResults = new KeysResult(options.keys.length);
				for (var keyI = options.keys.length - 1; keyI >= 0; --keyI) {
					var target = getValue(obj, options.keys[keyI]);
					if (!target) {
						objResults[keyI] = noTarget;
						continue;
					}
					if (!isPrepared(target)) target = getPrepared(target);
					target._score = NEGATIVE_INFINITY;
					target._indexes.len = 0;
					objResults[keyI] = target;
				}
				objResults.obj = obj;
				objResults._score = NEGATIVE_INFINITY;
				results.push(objResults);
				if (results.length >= limit) return results;
			}
else for (var i = 0; i < targets.length; i++) {
				var target = targets[i];
				if (target == NULL) continue;
				if (!isPrepared(target)) target = getPrepared(target);
				target._score = NEGATIVE_INFINITY;
				target._indexes.len = 0;
				results.push(target);
				if (results.length >= limit) return results;
			}
			return results;
		};
		var algorithm = (preparedSearch, prepared, allowSpaces = false, allowPartialMatch = false) => {
			if (allowSpaces === false && preparedSearch.containsSpace) return algorithmSpaces(preparedSearch, prepared, allowPartialMatch);
			var searchLower = preparedSearch._lower;
			var searchLowerCodes = preparedSearch.lowerCodes;
			var searchLowerCode = searchLowerCodes[0];
			var targetLowerCodes = prepared._targetLowerCodes;
			var searchLen = searchLowerCodes.length;
			var targetLen = targetLowerCodes.length;
			var searchI = 0;
			var targetI = 0;
			var matchesSimpleLen = 0;
			for (;;) {
				var isMatch = searchLowerCode === targetLowerCodes[targetI];
				if (isMatch) {
					matchesSimple[matchesSimpleLen++] = targetI;
					++searchI;
					if (searchI === searchLen) break;
					searchLowerCode = searchLowerCodes[searchI];
				}
				++targetI;
				if (targetI >= targetLen) return NULL;
			}
			var searchI = 0;
			var successStrict = false;
			var matchesStrictLen = 0;
			var nextBeginningIndexes = prepared._nextBeginningIndexes;
			if (nextBeginningIndexes === NULL) nextBeginningIndexes = prepared._nextBeginningIndexes = prepareNextBeginningIndexes(prepared.target);
			targetI = matchesSimple[0] === 0 ? 0 : nextBeginningIndexes[matchesSimple[0] - 1];
			var backtrackCount = 0;
			if (targetI !== targetLen) for (;;) if (targetI >= targetLen) {
				if (searchI <= 0) break;
				++backtrackCount;
				if (backtrackCount > 200) break;
				--searchI;
				var lastMatch = matchesStrict[--matchesStrictLen];
				targetI = nextBeginningIndexes[lastMatch];
			} else {
				var isMatch = searchLowerCodes[searchI] === targetLowerCodes[targetI];
				if (isMatch) {
					matchesStrict[matchesStrictLen++] = targetI;
					++searchI;
					if (searchI === searchLen) {
						successStrict = true;
						break;
					}
					++targetI;
				} else targetI = nextBeginningIndexes[targetI];
			}
			var substringIndex = searchLen <= 1 ? -1 : prepared._targetLower.indexOf(searchLower, matchesSimple[0]);
			var isSubstring = !!~substringIndex;
			var isSubstringBeginning = !isSubstring ? false : substringIndex === 0 || prepared._nextBeginningIndexes[substringIndex - 1] === substringIndex;
			if (isSubstring && !isSubstringBeginning) for (var i = 0; i < nextBeginningIndexes.length; i = nextBeginningIndexes[i]) {
				if (i <= substringIndex) continue;
				for (var s = 0; s < searchLen; s++) if (searchLowerCodes[s] !== prepared._targetLowerCodes[i + s]) break;
				if (s === searchLen) {
					substringIndex = i;
					isSubstringBeginning = true;
					break;
				}
			}
			var calculateScore = (matches) => {
				var score$1 = 0;
				var extraMatchGroupCount = 0;
				for (var i$1 = 1; i$1 < searchLen; ++i$1) if (matches[i$1] - matches[i$1 - 1] !== 1) {
					score$1 -= matches[i$1];
					++extraMatchGroupCount;
				}
				var unmatchedDistance = matches[searchLen - 1] - matches[0] - (searchLen - 1);
				score$1 -= (12 + unmatchedDistance) * extraMatchGroupCount;
				if (matches[0] !== 0) score$1 -= matches[0] * matches[0] * .2;
				if (!successStrict) score$1 *= 1e3;
else {
					var uniqueBeginningIndexes = 1;
					for (var i$1 = nextBeginningIndexes[0]; i$1 < targetLen; i$1 = nextBeginningIndexes[i$1]) ++uniqueBeginningIndexes;
					if (uniqueBeginningIndexes > 24) score$1 *= (uniqueBeginningIndexes - 24) * 10;
				}
				score$1 -= (targetLen - searchLen) / 2;
				if (isSubstring) score$1 /= 1 + searchLen * searchLen * 1;
				if (isSubstringBeginning) score$1 /= 1 + searchLen * searchLen * 1;
				score$1 -= (targetLen - searchLen) / 2;
				return score$1;
			};
			if (!successStrict) {
				if (isSubstring) for (var i = 0; i < searchLen; ++i) matchesSimple[i] = substringIndex + i;
				var matchesBest = matchesSimple;
				var score = calculateScore(matchesBest);
			} else if (isSubstringBeginning) {
				for (var i = 0; i < searchLen; ++i) matchesSimple[i] = substringIndex + i;
				var matchesBest = matchesSimple;
				var score = calculateScore(matchesSimple);
			} else {
				var matchesBest = matchesStrict;
				var score = calculateScore(matchesStrict);
			}
			prepared._score = score;
			for (var i = 0; i < searchLen; ++i) prepared._indexes[i] = matchesBest[i];
			prepared._indexes.len = searchLen;
			const result = new Result();
			result.target = prepared.target;
			result._score = prepared._score;
			result._indexes = prepared._indexes;
			return result;
		};
		var algorithmSpaces = (preparedSearch, target, allowPartialMatch) => {
			var seen_indexes = new Set();
			var score = 0;
			var result = NULL;
			var first_seen_index_last_search = 0;
			var searches = preparedSearch.spaceSearches;
			var searchesLen = searches.length;
			var changeslen = 0;
			var resetNextBeginningIndexes = () => {
				for (let i$1 = changeslen - 1; i$1 >= 0; i$1--) target._nextBeginningIndexes[nextBeginningIndexesChanges[i$1 * 2 + 0]] = nextBeginningIndexesChanges[i$1 * 2 + 1];
			};
			var hasAtLeast1Match = false;
			for (var i = 0; i < searchesLen; ++i) {
				allowPartialMatchScores[i] = NEGATIVE_INFINITY;
				var search = searches[i];
				result = algorithm(search, target);
				if (allowPartialMatch) {
					if (result === NULL) continue;
					hasAtLeast1Match = true;
				} else if (result === NULL) {
					resetNextBeginningIndexes();
					return NULL;
				}
				var isTheLastSearch = i === searchesLen - 1;
				if (!isTheLastSearch) {
					var indexes = result._indexes;
					var indexesIsConsecutiveSubstring = true;
					for (let i$1 = 0; i$1 < indexes.len - 1; i$1++) if (indexes[i$1 + 1] - indexes[i$1] !== 1) {
						indexesIsConsecutiveSubstring = false;
						break;
					}
					if (indexesIsConsecutiveSubstring) {
						var newBeginningIndex = indexes[indexes.len - 1] + 1;
						var toReplace = target._nextBeginningIndexes[newBeginningIndex - 1];
						for (let i$1 = newBeginningIndex - 1; i$1 >= 0; i$1--) {
							if (toReplace !== target._nextBeginningIndexes[i$1]) break;
							target._nextBeginningIndexes[i$1] = newBeginningIndex;
							nextBeginningIndexesChanges[changeslen * 2 + 0] = i$1;
							nextBeginningIndexesChanges[changeslen * 2 + 1] = toReplace;
							changeslen++;
						}
					}
				}
				score += result._score / searchesLen;
				allowPartialMatchScores[i] = result._score / searchesLen;
				if (result._indexes[0] < first_seen_index_last_search) score -= (first_seen_index_last_search - result._indexes[0]) * 2;
				first_seen_index_last_search = result._indexes[0];
				for (var j = 0; j < result._indexes.len; ++j) seen_indexes.add(result._indexes[j]);
			}
			if (allowPartialMatch && !hasAtLeast1Match) return NULL;
			resetNextBeginningIndexes();
			var allowSpacesResult = algorithm(
				preparedSearch,
				target,
				/*allowSpaces=*/
				true
);
			if (allowSpacesResult !== NULL && allowSpacesResult._score > score) {
				if (allowPartialMatch) for (var i = 0; i < searchesLen; ++i) allowPartialMatchScores[i] = allowSpacesResult._score / searchesLen;
				return allowSpacesResult;
			}
			if (allowPartialMatch) result = target;
			result._score = score;
			var i = 0;
			for (let index of seen_indexes) result._indexes[i++] = index;
			result._indexes.len = i;
			return result;
		};
		var remove_accents = (str) => str.replace(/\p{Script=Latin}+/gu, (match) => match.normalize("NFD")).replace(/[\u0300-\u036f]/g, "");
		var prepareLowerInfo = (str) => {
			str = remove_accents(str);
			var strLen = str.length;
			var lower = str.toLowerCase();
			var lowerCodes = [];
			var bitflags = 0;
			var containsSpace = false;
			for (var i = 0; i < strLen; ++i) {
				var lowerCode = lowerCodes[i] = lower.charCodeAt(i);
				if (lowerCode === 32) {
					containsSpace = true;
					continue;
				}
				var bit = lowerCode >= 97 && lowerCode <= 122 ? lowerCode - 97 : lowerCode >= 48 && lowerCode <= 57 ? 26 : lowerCode <= 127 ? 30 : 31;
				bitflags |= 1 << bit;
			}
			return {
				lowerCodes,
				bitflags,
				containsSpace,
				_lower: lower
			};
		};
		var prepareBeginningIndexes = (target) => {
			var targetLen = target.length;
			var beginningIndexes = [];
			var beginningIndexesLen = 0;
			var wasUpper = false;
			var wasAlphanum = false;
			for (var i = 0; i < targetLen; ++i) {
				var targetCode = target.charCodeAt(i);
				var isUpper = targetCode >= 65 && targetCode <= 90;
				var isAlphanum = isUpper || targetCode >= 97 && targetCode <= 122 || targetCode >= 48 && targetCode <= 57;
				var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum;
				wasUpper = isUpper;
				wasAlphanum = isAlphanum;
				if (isBeginning) beginningIndexes[beginningIndexesLen++] = i;
			}
			return beginningIndexes;
		};
		var prepareNextBeginningIndexes = (target) => {
			target = remove_accents(target);
			var targetLen = target.length;
			var beginningIndexes = prepareBeginningIndexes(target);
			var nextBeginningIndexes = [];
			var lastIsBeginning = beginningIndexes[0];
			var lastIsBeginningI = 0;
			for (var i = 0; i < targetLen; ++i) if (lastIsBeginning > i) nextBeginningIndexes[i] = lastIsBeginning;
else {
				lastIsBeginning = beginningIndexes[++lastIsBeginningI];
				nextBeginningIndexes[i] = lastIsBeginning === undefined ? targetLen : lastIsBeginning;
			}
			return nextBeginningIndexes;
		};
		var preparedCache = new Map();
		var preparedSearchCache = new Map();
		var matchesSimple = [];
		var matchesStrict = [];
		var nextBeginningIndexesChanges = [];
		var keysSpacesBestScores = [];
		var allowPartialMatchScores = [];
		var tmpTargets = [];
		var tmpResults = [];
		var getValue = (obj, prop) => {
			var tmp = obj[prop];
			if (tmp !== undefined) return tmp;
			if (typeof prop === "function") return prop(obj);
			var segs = prop;
			if (!Array.isArray(prop)) segs = prop.split(".");
			var len = segs.length;
			var i = -1;
			while (obj && ++i < len) obj = obj[segs[i]];
			return obj;
		};
		var isPrepared = (x) => {
			return typeof x === "object" && typeof x._bitflags === "number";
		};
		var INFINITY = Infinity;
		var NEGATIVE_INFINITY = -INFINITY;
		var noResults = [];
		noResults.total = 0;
		var NULL = null;
		var noTarget = prepare("");
		var fastpriorityqueue = (r) => {
			var e = [], o = 0, a = {}, v = (r$1) => {
				for (var a$1 = 0, v$1 = e[a$1], c = 1; c < o;) {
					var s = c + 1;
					a$1 = c, s < o && e[s]._score < e[c]._score && (a$1 = s), e[a$1 - 1 >> 1] = e[a$1], c = 1 + (a$1 << 1);
				}
				for (var f = a$1 - 1 >> 1; a$1 > 0 && v$1._score < e[f]._score; f = (a$1 = f) - 1 >> 1) e[a$1] = e[f];
				e[a$1] = v$1;
			};
			return a.add = (r$1) => {
				var a$1 = o;
				e[o++] = r$1;
				for (var v$1 = a$1 - 1 >> 1; a$1 > 0 && r$1._score < e[v$1]._score; v$1 = (a$1 = v$1) - 1 >> 1) e[a$1] = e[v$1];
				e[a$1] = r$1;
			}, a.poll = (r$1) => {
				if (0 !== o) {
					var a$1 = e[0];
					return e[0] = e[--o], v(), a$1;
				}
			}, a.peek = (r$1) => {
				if (0 !== o) return e[0];
			}, a.replaceTop = (r$1) => {
				e[0] = r$1, v();
			}, a;
		};
		var q = fastpriorityqueue();
		return {
			"single": single,
			"go": go,
			"prepare": prepare,
			"cleanup": cleanup
		};
	});
} });

//#endregion
//#region plugins/plugin-browser/components/Plugins.scss
const classes$1 = {
	"loading": "L-W60G_loading",
	"split": "L-W60G_split",
	"pluginList": "L-W60G_pluginList",
	"subtitle": "L-W60G_subtitle",
	"repoHeader": "L-W60G_repoHeader"
};
const css$1 = `.L-W60G_subtitle {
  margin-top: 12px;
  display: block;
}

.L-W60G_pluginList {
  grid-gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 16px;
  display: grid;
}

.L-W60G_repoHeader {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.L-W60G_loading {
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 12px;
  display: flex;
}

.L-W60G_split {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  display: flex;
}

.L-W60G_split button {
  width: 10%;
  height: 100%;
}
`;

//#endregion
//#region plugins/plugin-browser/api.ts
async function getAllPlugins() {
	const response = await fetch("https://shindex.uwu.network/data");
	const data = await response.json();
	return data;
}

//#endregion
//#region plugins/plugin-browser/components/PluginCard.scss
const classes = {
	"contents": "THQemG_contents",
	"installButton": "THQemG_installButton",
	"pluginCard": "THQemG_pluginCard",
	"buttonContainer": "THQemG_buttonContainer"
};
const css = `.THQemG_pluginCard {
  text-align: left;
  color: var(--text-default);
  background: var(--background-surface-highest);
  border-radius: 8px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 16px;
  display: flex;
}

.THQemG_pluginCard .THQemG_contents {
  flex: 1;
  margin-top: 8px;
}

.THQemG_pluginCard .THQemG_buttonContainer {
  width: 100%;
  margin-top: 8px;
}

.THQemG_pluginCard .THQemG_buttonContainer .THQemG_installButton {
  flex-grow: 1;
  width: 100%;
}

.THQemG_pluginCard .THQemG_buttonContainer .THQemG_installButton button P {
  width: 100%;
}
`;

//#endregion
//#region plugins/plugin-browser/components/PluginCard.tsx
var import_web$9 = __toESM(require_web());
var import_web$10 = __toESM(require_web());
var import_web$11 = __toESM(require_web());
var import_web$12 = __toESM(require_web());
var import_web$13 = __toESM(require_web());
var import_web$14 = __toESM(require_web());
var import_web$15 = __toESM(require_web());
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$9.template)(`<b></b>`, 2), _tmpl$2$1 = /*#__PURE__*/ (0, import_web$9.template)(`<div><!#><!/><!#><!/><div></div></div>`, 8);
const { ui: { injectCss: injectCss$1, Button: Button$1, Text: Text$1 }, solid: { createSignal: createSignal$1, createEffect: createEffect$1 }, plugins: { installedPlugins, addRemotePlugin } } = shelter;
let injectedCss$1 = false;
function PluginCard({ plugin }) {
	if (!injectedCss$1) {
		injectCss$1(css);
		injectedCss$1 = true;
	}
	const [installed, setInstalled] = createSignal$1(false);
	createEffect$1(async () => {
		const installed$1 = Object.values(installedPlugins?.() || {}).some((p) => p.manifest.name === plugin.name && p.manifest.author === plugin.author);
		setInstalled(installed$1);
	});
	const installPlugin = () => {
		addRemotePlugin(plugin.name, plugin.url, true);
		setInstalled(true);
	};
	return (() => {
		const _el$ = (0, import_web$14.getNextElement)(_tmpl$2$1), _el$5 = _el$.firstChild, [_el$6, _co$] = (0, import_web$12.getNextMarker)(_el$5.nextSibling), _el$7 = _el$6.nextSibling, [_el$8, _co$2] = (0, import_web$12.getNextMarker)(_el$7.nextSibling), _el$4 = _el$8.nextSibling;
		(0, import_web$15.insert)(_el$, (0, import_web$13.createComponent)(Text$1, {
			get ["class"]() {
				return classes.name;
			},
			get children() {
				return [
					(() => {
						const _el$2 = (0, import_web$14.getNextElement)(_tmpl$$1);
						(0, import_web$15.insert)(_el$2, () => plugin.name);
						return _el$2;
					})(),
					" by ",
					(() => {
						const _el$3 = (0, import_web$14.getNextElement)(_tmpl$$1);
						(0, import_web$15.insert)(_el$3, () => plugin.author);
						return _el$3;
					})()
				];
			}
		}), _el$6, _co$);
		(0, import_web$15.insert)(_el$, (0, import_web$13.createComponent)(Text$1, {
			get ["class"]() {
				return classes.contents;
			},
			get children() {
				return plugin.description;
			}
		}), _el$8, _co$2);
		(0, import_web$15.insert)(_el$4, (0, import_web$13.createComponent)(Button$1, {
			get ["class"]() {
				return classes.installButton;
			},
			onClick: installPlugin,
			get disabled() {
				return installed() || !plugin.name;
			},
			get children() {
				return installed() ? "Installed" : "Install";
			}
		}));
		(0, import_web$11.effect)((_p$) => {
			const _v$ = classes.pluginCard, _v$2 = classes.buttonContainer;
			_v$ !== _p$._v$ && (0, import_web$10.className)(_el$, _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && (0, import_web$10.className)(_el$4, _p$._v$2 = _v$2);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined
		});
		return _el$;
	})();
}

//#endregion
//#region plugins/plugin-browser/components/Plugins.tsx
var import_web = __toESM(require_web());
var import_web$1 = __toESM(require_web());
var import_web$2 = __toESM(require_web());
var import_web$3 = __toESM(require_web());
var import_web$4 = __toESM(require_web());
var import_web$5 = __toESM(require_web());
var import_web$6 = __toESM(require_web());
var import_web$7 = __toESM(require_web());
var import_web$8 = __toESM(require_web());
var import_fuzzysort = __toESM(require_fuzzysort());
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<div><!#><!/><!#><!/></div>`, 6), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<a target="_blank">View Repository</a>`, 2), _tmpl$3 = /*#__PURE__*/ (0, import_web.template)(`<div></div>`, 2);
const { ui: { Button, injectCss, Header, HeaderTags, Text, Divider, TextBox, showToast }, solid: { createSignal, createEffect } } = shelter;
let injectedCss = false;
const debounce = (fn, ms) => {
	let timeoutId = null;
	return (...args) => {
		window.clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => {
			fn(...args);
		}, ms);
	};
};
function Plugins() {
	if (!injectedCss) {
		injectCss(css$1);
		injectedCss = true;
	}
	const [repos, setRepos] = createSignal([]);
	const [search, setSearch] = createSignal("");
	const [filteredRepos, setFilteredRepos] = createSignal([]);
	const loadPlugins = async () => {
		const plugins = await getAllPlugins().catch((e) => {
			console.error(e);
			showToast({
				title: "Plugin Browser",
				content: "Failed to load plugins, check DevTools for error.",
				duration: 5e3
			});
			return [];
		});
		setRepos(plugins);
	};
	createEffect(() => {
		loadPlugins();
	});
	createEffect(() => {
		const searchTerm = search();
		const allRepos = repos();
		if (!searchTerm) {
			setFilteredRepos(allRepos.map((repo) => {
				const allPlugins = repo.plugins.filter((p) => !(p.name.toLowerCase().includes("dorion") && repo.name === "SpikeHD/shelter-plugins"));
				return {
					...repo,
					plugins: allPlugins
				};
			}));
			return;
		}
		const filteredReposList = allRepos.map((repo) => {
			const allPlugins = repo.plugins.filter((p) => !(p.name.toLowerCase().includes("dorion") && repo.name === "SpikeHD/shelter-plugins"));
			if (allPlugins.length === 0) return {
				...repo,
				plugins: []
			};
			const results = import_fuzzysort.default.go(searchTerm, allPlugins, {
				keys: ["name", "description"],
				threshold: 0
			});
			const filteredPlugins = results.map((result) => result.obj);
			return {
				...repo,
				plugins: filteredPlugins
			};
		}).filter((repo) => repo.plugins.length > 0);
		setFilteredRepos(filteredReposList);
	});
	return [
		(0, import_web$8.createComponent)(Header, {
			get tag() {
				return HeaderTags.H1;
			},
			children: "Plugins"
		}),
		(0, import_web$8.createComponent)(Divider, {
			mt: 16,
			mb: 16
		}),
		(() => {
			const _el$ = (0, import_web$5.getNextElement)(_tmpl$), _el$2 = _el$.firstChild, [_el$3, _co$] = (0, import_web$6.getNextMarker)(_el$2.nextSibling), _el$4 = _el$3.nextSibling, [_el$5, _co$2] = (0, import_web$6.getNextMarker)(_el$4.nextSibling);
			(0, import_web$7.insert)(_el$, (0, import_web$8.createComponent)(TextBox, {
				get value() {
					return search();
				},
				get onInput() {
					return debounce((v) => setSearch(v), 100);
				},
				placeholder: "Search..."
			}), _el$3, _co$);
			(0, import_web$7.insert)(_el$, (0, import_web$8.createComponent)(Button, {
				onClick: () => {
					setRepos([]);
					loadPlugins();
				},
				children: "Refresh"
			}), _el$5, _co$2);
			(0, import_web$4.effect)(() => (0, import_web$3.className)(_el$, classes$1.split));
			return _el$;
		})(),
		(0, import_web$2.memo)((() => {
			const _c$ = (0, import_web$2.memo)(() => repos()?.length > 0);
			return () => _c$() ? filteredRepos().map((repo) => {
				return [
					(0, import_web$8.createComponent)(Divider, {
						mt: 16,
						mb: 16
					}),
					(() => {
						const _el$6 = (0, import_web$5.getNextElement)(_tmpl$), _el$8 = _el$6.firstChild, [_el$9, _co$3] = (0, import_web$6.getNextMarker)(_el$8.nextSibling), _el$0 = _el$9.nextSibling, [_el$1, _co$4] = (0, import_web$6.getNextMarker)(_el$0.nextSibling);
						(0, import_web$7.insert)(_el$6, (0, import_web$8.createComponent)(Header, {
							get tag() {
								return HeaderTags.H2;
							},
							get children() {
								return repo.name;
							}
						}), _el$9, _co$3);
						(0, import_web$7.insert)(_el$6, (0, import_web$8.createComponent)(Header, {
							get tag() {
								return HeaderTags.H2;
							},
							get children() {
								const _el$7 = (0, import_web$5.getNextElement)(_tmpl$2);
								(0, import_web$4.effect)(() => (0, import_web$1.setAttribute)(_el$7, "href", repo.url));
								return _el$7;
							}
						}), _el$1, _co$4);
						(0, import_web$4.effect)(() => (0, import_web$3.className)(_el$6, classes$1.repoHeader));
						return _el$6;
					})(),
					(() => {
						const _el$10 = (0, import_web$5.getNextElement)(_tmpl$3);
						(0, import_web$7.insert)(_el$10, () => repo.plugins.map((p) => {
							return (0, import_web$8.createComponent)(PluginCard, { plugin: p });
						}));
						(0, import_web$4.effect)(() => (0, import_web$3.className)(_el$10, classes$1.pluginList));
						return _el$10;
					})()
				];
			}) : (() => {
				const _el$11 = (0, import_web$5.getNextElement)(_tmpl$3);
				(0, import_web$7.insert)(_el$11, (0, import_web$8.createComponent)(Text, { children: "Loading..." }));
				(0, import_web$4.effect)(() => (0, import_web$3.className)(_el$11, classes$1.loading));
				return _el$11;
			})();
		})())
	];
}

//#endregion
//#region plugins/plugin-browser/index.ts
const { settings: { registerSection } } = shelter;
const unload = registerSection("section", "plugin-browser", "Plugin Browser", Plugins);
const onUnload = () => {
	unload();
};

//#endregion
exports.onUnload = onUnload
return exports;
})({});