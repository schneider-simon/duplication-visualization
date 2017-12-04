import _set from 'lodash/set'
import _groupBy from 'lodash/groupBy'
import _trim from 'lodash/trim'

export const EXAMPLE_DUPLICATION_REPORT = [{
  "location": "/src/smallsql/database/MutableNumeric.java",
  "lines": [374, 375, 376, 377, 378, 379]
},
  {
    "location": "/src/smallsql/database/StorePage.java",
    "lines": [15, 16, 17, 18, 19, 20]
  },
  {
    "location": "/src/smallsql/database/SortedResult.java",
    "lines": [35, 36, 37, 38, 39, 40]
  },
  {
    "location": "/src/smallsql/database/SortedResult.java",
    "lines": [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81]
  },
  {
    "location": "/src/smallsql/database/SortedResult.java",
    "lines": [87, 88, 89, 90, 91, 92]
  },
  {
    "location": "/src/smallsql/database/SSResultSet.java",
    "lines": [61, 62, 63, 64, 65, 66, 67, 68]
  },
  {
    "location": "/src/smallsql/database/SSResultSet.java",
    "lines": [76, 77, 78, 79, 80, 81, 82, 83]
  },
  {
    "location": "/src/smallsql/database/SSResultSet.java",
    "lines": [180, 181, 182, 183, 184, 185, 186, 187]
  },
  {
    "location": "/src/smallsql/database/SSResultSet.java",
    "lines": [249, 250, 251, 252, 253, 254, 255]
  },
  {
    "location": "/src/smallsql/database/SSResultSet.java",
    "lines": [283, 284, 285, 286, 287, 288]
  },
  {
    "location": "/src/smallsql/database/SSResultSet.java",
    "lines": [290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309]
  },
  {
    "location": "/src/smallsql/database/SSResultSet.java",
    "lines": [318, 319, 320, 321, 322, 323]
  },
  {
    "location": "/src/smallsql/database/SSResultSet.java",
    "lines": [325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344]
  },
  {
    "location": "/src/smallsql/database/SSResultSet.java",
    "lines": [624, 625, 626, 627, 628, 629]
  },
  {
    "location": "/src/smallsql/database/JoinScroll.java",
    "lines": [59, 60, 61, 62, 63, 64, 65]
  },
  {
    "location": "/src/smallsql/junit/TestFunctions.java",
    "lines": [351, 352, 353, 354, 355, 356]
  },
  {
    "location": "/src/smallsql/database/StorePageMap.java",
    "lines": [71, 72, 73, 74, 75, 76]
  },
  {
    "location": "/src/smallsql/database/IndexNode.java",
    "lines": [65, 66, 67, 68, 69, 70, 71, 72, 73, 74]
  },
  {
    "location": "/src/smallsql/junit/TestDataTypes.java",
    "lines": [40, 41, 42, 43, 44, 45]
  },
  {
    "location": "/src/smallsql/junit/TestDataTypes.java",
    "lines": [53, 54, 55, 56, 57, 58, 59, 60, 61, 62]
  },
  {
    "location": "/src/smallsql/database/SSPreparedStatement.java",
    "lines": [83, 84, 85, 86, 87, 88]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [40, 41, 42, 43, 44, 45]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [117, 118, 119, 120, 121, 122]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [126, 127, 128, 129, 130, 131]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [141, 142, 143, 144, 145, 146]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [148, 149, 150, 151, 152, 153, 154, 155]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [159, 160, 161, 162, 163, 164]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [166, 167, 168, 169, 170, 171, 172, 173]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [177, 178, 179, 180, 181, 182, 183]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [187, 188, 189, 190, 191, 192]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [196, 197, 198, 199, 200, 201, 202]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [206, 207, 208, 209, 210, 211, 212]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [216, 217, 218, 219, 220, 221, 222]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [226, 227, 228, 229, 230, 231]
  },
  {
    "location": "/src/smallsql/database/Index.java",
    "lines": [235, 236, 237, 238, 239, 240, 241]
  },
  {
    "location": "/src/smallsql/database/Utils.java",
    "lines": [145, 146, 147, 148, 149, 150, 151, 152, 153]
  },
  {
    "location": "/src/smallsql/database/Utils.java",
    "lines": [178, 179, 180, 181, 182, 183, 184, 185, 186]
  },
  {
    "location": "/src/smallsql/database/Utils.java",
    "lines": [210, 211, 212, 213, 214, 215, 216]
  },
  {
    "location": "/src/smallsql/database/Utils.java",
    "lines": [233, 234, 235, 236, 237, 238, 239]
  },
  {
    "location": "/src/smallsql/database/IndexScrollStatus.java",
    "lines": [12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
  },
  {
    "location": "/src/smallsql/database/IndexScrollStatus.java",
    "lines": [67, 68, 69, 70, 71, 72, 73, 74, 75, 76]
  },
  {
    "location": "/src/smallsql/database/ExpressionName.java",
    "lines": [0, 1, 2, 3, 4, 5]
  },
  {
    "location": "/src/smallsql/database/ExpressionName.java",
    "lines": [9, 10, 11, 12, 13, 14, 15, 16, 17]
  },
  {
    "location": "/src/smallsql/database/ExpressionName.java",
    "lines": [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
  },
  {
    "location": "/src/smallsql/database/ExpressionName.java",
    "lines": [37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    "location": "/src/smallsql/database/ExpressionName.java",
    "lines": [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65]
  },
  {
    "location": "/src/smallsql/database/SSStatement.java",
    "lines": [172, 173, 174, 175, 176, 177]
  },
  {
    "location": "/src/smallsql/database/SSStatement.java",
    "lines": [206, 207, 208, 209, 210, 211]
  },
  {
    "location": "/src/smallsql/database/SSStatement.java",
    "lines": [220, 221, 222, 223, 224, 225, 226, 227, 228, 229]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [59, 60, 61, 62, 63, 64, 65, 66, 67, 68]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [129, 130, 131, 132, 133, 134, 135, 136, 137]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [165, 166, 167, 168, 169, 170]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [183, 184, 185, 186, 187, 188]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [348, 349, 350, 351, 352, 353, 354, 355]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [366, 367, 368, 369, 370, 371]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402]
  },
  {
    "location": "/src/smallsql/database/language/Language.java",
    "lines": [431, 432, 433, 434, 435]
  },
  {
    "location": "/src/smallsql/database/ViewResult.java",
    "lines": [26, 27, 28, 29, 30, 31, 32, 33]
  },
  {
    "location": "/src/smallsql/junit/TestJoins.java",
    "lines": [6, 7, 8, 9, 10, 11, 12]
  },
  {
    "location": "/src/smallsql/junit/TestJoins.java",
    "lines": [48, 49, 50, 51, 52, 53]
  },
  {
    "location": "/src/smallsql/junit/TestJoins.java",
    "lines": [59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69]
  },
  {
    "location": "/src/smallsql/junit/TestJoins.java",
    "lines": [84, 85, 86, 87, 88, 89, 90]
  },
  {
    "location": "/src/smallsql/junit/TestJoins.java",
    "lines": [96, 97, 98, 99, 100, 101]
  },
  {
    "location": "/src/smallsql/junit/TestJoins.java",
    "lines": [103, 104, 105, 106, 107, 108]
  },
  {
    "location": "/src/smallsql/junit/TestJoins.java",
    "lines": [114, 115, 116, 117, 118, 119]
  },
  {
    "location": "/src/smallsql/junit/TestJoins.java",
    "lines": [121, 122, 123, 124, 125, 126]
  },
  {
    "location": "/src/smallsql/junit/TestThreads.java",
    "lines": [0, 1, 2, 3]
  },
  {
    "location": "/src/smallsql/junit/TestThreads.java",
    "lines": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  },
  {
    "location": "/src/smallsql/junit/TestThreads.java",
    "lines": [29, 30, 31, 32, 33, 34, 35]
  },
  {
    "location": "/src/smallsql/junit/TestThreads.java",
    "lines": [37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    "location": "/src/smallsql/junit/TestThreads.java",
    "lines": [50, 51, 52, 53, 54, 55, 56]
  },
  {
    "location": "/src/smallsql/junit/TestThreads.java",
    "lines": [73, 74, 75, 76, 77, 78, 79, 80, 81, 82]
  },
  {
    "location": "/src/smallsql/database/Table.java",
    "lines": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  },
  {
    "location": "/src/smallsql/database/Table.java",
    "lines": [63, 64, 65, 66, 67, 68, 69]
  },
  {
    "location": "/src/smallsql/database/Table.java",
    "lines": [358, 359, 360, 361, 362, 363]
  },
  {
    "location": "/src/smallsql/database/Table.java",
    "lines": [365, 366, 367, 368, 369, 370]
  },
  {
    "location": "/src/smallsql/database/Table.java",
    "lines": [375, 376, 377, 378, 379, 380, 381, 382, 383, 384]
  },
  {
    "location": "/src/smallsql/database/Table.java",
    "lines": [386, 387, 388, 389, 390]
  },
  {
    "location": "/src/smallsql/database/ExpressionArithmetic.java",
    "lines": [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112]
  },
  {
    "location": "/src/smallsql/database/ExpressionArithmetic.java",
    "lines": [176, 177, 178, 179, 180, 181, 182, 183]
  },
  {
    "location": "/src/smallsql/database/ExpressionArithmetic.java",
    "lines": [335, 336, 337, 338, 339, 340]
  },
  {
    "location": "/src/smallsql/database/ExpressionArithmetic.java",
    "lines": [369, 370, 371, 372, 373, 374]
  },
  {
    "location": "/src/smallsql/database/ExpressionArithmetic.java",
    "lines": [459, 460, 461, 462, 463, 464, 465, 466]
  },
  {
    "location": "/src/smallsql/database/ExpressionArithmetic.java",
    "lines": [660, 661, 662, 663, 664, 665, 666]
  },
  {
    "location": "/src/smallsql/database/ExpressionArithmetic.java",
    "lines": [690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708]
  },
  {
    "location": "/src/smallsql/database/ExpressionArithmetic.java",
    "lines": [710, 711, 712, 713, 714, 715, 716, 717]
  },
  {
    "location": "/src/smallsql/database/ExpressionArithmetic.java",
    "lines": [721, 722, 723, 724, 725, 726]
  },
  {
    "location": "/src/smallsql/database/ExpressionArithmetic.java",
    "lines": [845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [460, 461, 462, 463, 464, 465]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [670, 671, 672, 673, 674, 675, 676, 677]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [679, 680, 681, 682, 683, 684, 685]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [731, 732, 733, 734, 735, 736, 737, 738]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [740, 741, 742, 743, 744, 745, 746, 747, 748]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [777, 778, 779, 780, 781, 782, 783, 784, 785]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [791, 792, 793, 794, 795, 796, 797, 798]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [837, 838, 839, 840, 841, 842, 843, 844, 845]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [851, 852, 853, 854, 855, 856, 857, 858]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [897, 898, 899, 900, 901, 902, 903, 904, 905]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [993, 994, 995, 996, 997, 998, 999]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [1077, 1078, 1079, 1080, 1081, 1082]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [1139, 1140, 1141, 1142, 1143, 1144]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [1162, 1163, 1164, 1165, 1166, 1167]
  },
  {
    "location": "/src/smallsql/database/SQLParser.java",
    "lines": [1210, 1211, 1212, 1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230, 1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionExp.java",
    "lines": [0, 1]
  },
  {
    "location": "/src/smallsql/database/MemoryStream.java",
    "lines": [65, 66, 67, 68, 69, 70]
  },
  {
    "location": "/src/smallsql/database/MemoryStream.java",
    "lines": [98, 99, 100, 101, 102]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionCase.java",
    "lines": [0]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionCase.java",
    "lines": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionCase.java",
    "lines": [54, 55, 56, 57, 58, 59, 60]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionCase.java",
    "lines": [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionCase.java",
    "lines": [87, 88, 89, 90, 91, 92, 93, 94]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionLCase.java",
    "lines": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionTimestampDiff.java",
    "lines": [90, 91, 92, 93, 94, 95, 96, 97]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionTimestampDiff.java",
    "lines": [101, 102, 103]
  },
  {
    "location": "/src/smallsql/database/Command.java",
    "lines": [1, 2, 3, 4, 5, 6, 7, 8]
  },
  {
    "location": "/src/smallsql/database/Command.java",
    "lines": [37, 38, 39, 40, 41, 42, 43, 44]
  },
  {
    "location": "/src/smallsql/database/TableResult.java",
    "lines": [90, 91, 92, 93, 94, 95]
  },
  {
    "location": "/src/smallsql/database/TableResult.java",
    "lines": [100, 101, 102, 103, 104, 105]
  },
  {
    "location": "/src/smallsql/database/TableResult.java",
    "lines": [199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214]
  },
  {
    "location": "/src/smallsql/database/TableResult.java",
    "lines": [235, 236, 237, 238, 239, 240, 241, 242]
  },
  {
    "location": "/src/smallsql/database/MemoryResult.java",
    "lines": [13, 14, 15, 16, 17, 18]
  },
  {
    "location": "/src/smallsql/database/MemoryResult.java",
    "lines": [23, 24, 25, 26, 27, 28]
  },
  {
    "location": "/src/smallsql/database/MemoryResult.java",
    "lines": [52, 53, 54, 55, 56, 57, 58]
  },
  {
    "location": "/src/smallsql/database/MemoryResult.java",
    "lines": [107, 108, 109, 110, 111, 112, 113, 114, 115]
  },
  {
    "location": "/src/smallsql/database/MemoryResult.java",
    "lines": [117, 118, 119, 120, 121, 122, 123, 124]
  },
  {
    "location": "/src/smallsql/junit/TestOrderBy.java",
    "lines": [0, 1, 2, 3, 4, 5]
  },
  {
    "location": "/src/smallsql/junit/TestOrderBy.java",
    "lines": [51, 52, 53, 54, 55, 56]
  },
  {
    "location": "/src/smallsql/junit/TestOrderBy.java",
    "lines": [60, 61, 62, 63, 64, 65, 66]
  },
  {
    "location": "/src/smallsql/junit/TestOrderBy.java",
    "lines": [71, 72, 73, 74, 75, 76, 77]
  },
  {
    "location": "/src/smallsql/junit/TestOrderBy.java",
    "lines": [277, 278, 279, 280, 281, 282, 283]
  },
  {
    "location": "/src/smallsql/junit/TestOrderBy.java",
    "lines": [331, 332, 333, 334, 335, 336, 337]
  },
  {
    "location": "/src/smallsql/junit/TestOrderBy.java",
    "lines": [347, 348, 349, 350, 351, 352, 353, 354, 355, 356]
  },
  {
    "location": "/src/smallsql/junit/TestOrderBy.java",
    "lines": [383, 384, 385, 386, 387, 388, 389, 390, 391, 392]
  },
  {
    "location": "/src/smallsql/database/SSConnection.java",
    "lines": [48, 49, 50, 51, 52, 53]
  },
  {
    "location": "/src/smallsql/database/SSConnection.java",
    "lines": [63, 64, 65, 66, 67, 68]
  },
  {
    "location": "/src/smallsql/database/SSConnection.java",
    "lines": [72, 73, 74, 75, 76, 77]
  },
  {
    "location": "/src/smallsql/database/SSConnection.java",
    "lines": [81, 82, 83, 84, 85, 86]
  },
  {
    "location": "/src/smallsql/database/SSConnection.java",
    "lines": [99, 100, 101, 102, 103, 104, 105]
  },
  {
    "location": "/src/smallsql/database/SSConnection.java",
    "lines": [109, 110, 111, 112, 113, 114]
  },
  {
    "location": "/src/smallsql/database/SSConnection.java",
    "lines": [118, 119, 120, 121, 122, 123, 124]
  },
  {
    "location": "/src/smallsql/database/SSConnection.java",
    "lines": [128, 129, 130, 131, 132, 133, 134]
  },
  {
    "location": "/src/smallsql/database/SSConnection.java",
    "lines": [138, 139, 140, 141, 142, 143, 144]
  },
  {
    "location": "/src/smallsql/database/SSConnection.java",
    "lines": [201, 202, 203, 204, 205, 206]
  },
  {
    "location": "/src/smallsql/database/SSConnection.java",
    "lines": [216, 217, 218, 219, 220, 221]
  },
  {
    "location": "/src/smallsql/database/SSConnection.java",
    "lines": [237, 238, 239, 240, 241, 242, 243]
  },
  {
    "location": "/src/smallsql/database/StorePageLink.java",
    "lines": [0, 1, 2, 3, 4]
  },
  {
    "location": "/src/smallsql/database/IndexDescriptions.java",
    "lines": [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionDayOfMonth.java",
    "lines": [0, 1, 2]
  },
  {
    "location": "/src/smallsql/database/Distinct.java",
    "lines": [34, 35, 36, 37, 38, 39, 40]
  },
  {
    "location": "/src/smallsql/database/Distinct.java",
    "lines": [51, 52, 53, 54, 55, 56, 57]
  },
  {
    "location": "/src/smallsql/database/Distinct.java",
    "lines": [67, 68, 69, 70, 71, 72]
  },
  {
    "location": "/src/smallsql/database/SmallSQLException.java",
    "lines": [85, 86, 87, 88, 89, 90]
  },
  {
    "location": "/src/smallsql/database/ForeignKeys.java",
    "lines": [11, 12, 13, 14, 15, 16, 17]
  },
  {
    "location": "/src/smallsql/database/StoreNull.java",
    "lines": [10, 11, 12, 13, 14, 15, 16, 17, 18]
  },
  {
    "location": "/src/smallsql/database/StoreNull.java",
    "lines": [20, 21, 22, 23, 24, 25, 26, 27, 28]
  },
  {
    "location": "/src/smallsql/database/StoreNull.java",
    "lines": [38, 39, 40, 41, 42, 43, 44, 45, 46]
  },
  {
    "location": "/src/smallsql/database/StoreNull.java",
    "lines": [51, 52, 53, 54, 55, 56, 57]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionSin.java",
    "lines": [0, 1, 2, 3]
  },
  {
    "location": "/src/smallsql/database/DateTime.java",
    "lines": [2, 3, 4, 5, 6, 7, 8]
  },
  {
    "location": "/src/smallsql/database/DateTime.java",
    "lines": [17, 18, 19, 20, 21, 22, 23]
  },
  {
    "location": "/src/smallsql/database/DateTime.java",
    "lines": [63, 64, 65, 66, 67, 68]
  },
  {
    "location": "/src/smallsql/database/DateTime.java",
    "lines": [293, 294, 295, 296, 297, 298]
  },
  {
    "location": "/src/smallsql/database/DateTime.java",
    "lines": [331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345]
  },
  {
    "location": "/src/smallsql/database/DateTime.java",
    "lines": [354, 355, 356, 357, 358, 359]
  },
  {
    "location": "/src/smallsql/database/DateTime.java",
    "lines": [607, 608, 609, 610, 611, 612]
  },
  {
    "location": "/src/smallsql/database/DateTime.java",
    "lines": [643, 644, 645, 646, 647, 648, 649, 650, 651]
  },
  {
    "location": "/src/smallsql/database/DateTime.java",
    "lines": [653, 654, 655, 656, 657]
  },
  {
    "location": "/src/smallsql/junit/BasicTestCase.java",
    "lines": [267, 268, 269, 270, 271, 272, 273]
  },
  {
    "location": "/src/smallsql/database/CommandSelect.java",
    "lines": [137, 138, 139, 140, 141, 142, 143]
  },
  {
    "location": "/src/smallsql/database/language/Language_it.java",
    "lines": [7, 8, 9, 10, 11, 12, 13, 14]
  },
  {
    "location": "/src/smallsql/database/language/Language_it.java",
    "lines": [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  },
  {
    "location": "/src/smallsql/database/language/Language_it.java",
    "lines": [37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionTimestampAdd.java",
    "lines": [22, 23, 24, 25, 26, 27]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionTimestampAdd.java",
    "lines": [29, 30, 31, 32, 33, 34]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionTimestampAdd.java",
    "lines": [38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionTimestampAdd.java",
    "lines": [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionTimestampAdd.java",
    "lines": [62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
  },
  {
    "location": "/src/smallsql/database/Where.java",
    "lines": [59, 60, 61, 62, 63, 64]
  },
  {
    "location": "/src/smallsql/database/Where.java",
    "lines": [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81]
  },
  {
    "location": "/src/smallsql/database/Database.java",
    "lines": [15, 16, 17, 18, 19, 20, 21]
  },
  {
    "location": "/src/smallsql/database/Database.java",
    "lines": [330, 331, 332, 333, 334, 335, 336, 337, 338]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionReplace.java",
    "lines": [0, 1, 2, 3, 4, 5, 6]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionReplace.java",
    "lines": [47, 48, 49, 50, 51, 52]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionRTrim.java",
    "lines": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionRTrim.java",
    "lines": [20, 21, 22, 23, 24, 25, 26, 27, 28]
  },
  {
    "location": "/src/smallsql/database/Expression.java",
    "lines": [125, 126, 127]
  },
  {
    "location": "/src/smallsql/database/LongTreeList.java",
    "lines": [0, 1, 2, 3, 4, 5]
  },
  {
    "location": "/src/smallsql/database/LongTreeList.java",
    "lines": [13, 14, 15, 16, 17, 18, 19, 20]
  },
  {
    "location": "/src/smallsql/database/LongTreeList.java",
    "lines": [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
  },
  {
    "location": "/src/smallsql/database/LongTreeList.java",
    "lines": [56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70]
  },
  {
    "location": "/src/smallsql/database/LongTreeList.java",
    "lines": [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92]
  },
  {
    "location": "/src/smallsql/database/LongTreeList.java",
    "lines": [157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169]
  },
  {
    "location": "/src/smallsql/database/LongTreeList.java",
    "lines": [224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236]
  },
  {
    "location": "/src/smallsql/database/LongTreeList.java",
    "lines": [249, 250, 251, 252, 253, 254, 255, 256, 257, 258]
  },
  {
    "location": "/src/smallsql/database/CreateFile.java",
    "lines": [23, 24, 25, 26, 27, 28, 29]
  },
  {
    "location": "/src/smallsql/database/Strings.java",
    "lines": [18, 19, 20, 21, 22, 23, 24]
  },
  {
    "location": "/src/smallsql/database/MutableLong.java",
    "lines": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionLength.java",
    "lines": [0, 1, 2, 3, 4, 5, 6, 7]
  },
  {
    "location": "/src/smallsql/database/Column.java",
    "lines": [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56]
  },
  {
    "location": "/src/smallsql/database/Column.java",
    "lines": [58, 59, 60, 61, 62, 63, 64, 65, 66]
  },
  {
    "location": "/src/smallsql/database/Column.java",
    "lines": [108, 109]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionSubstring.java",
    "lines": [0]
  },
  {
    "location": "/src/smallsql/database/StoreImpl.java",
    "lines": [408, 409, 410, 411, 412, 413, 414]
  },
  {
    "location": "/src/smallsql/database/StoreImpl.java",
    "lines": [462, 463, 464, 465, 466, 467, 468]
  },
  {
    "location": "/src/smallsql/database/StoreImpl.java",
    "lines": [1210, 1211, 1212, 1213, 1214, 1215]
  },
  {
    "location": "/src/smallsql/database/StoreImpl.java",
    "lines": [1285, 1286, 1287, 1288, 1289]
  },
  {
    "location": "/src/smallsql/junit/TestAlterTable.java",
    "lines": [29, 30, 31, 32, 33, 34]
  },
  {
    "location": "/src/smallsql/junit/TestAlterTable.java",
    "lines": [63, 64, 65, 66, 67, 68]
  },
  {
    "location": "/src/smallsql/junit/TestIdentifer.java",
    "lines": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  },
  {
    "location": "/src/smallsql/junit/TestLanguage.java",
    "lines": [0, 1, 2, 3]
  },
  {
    "location": "/src/smallsql/junit/TestLanguage.java",
    "lines": [12, 13, 14, 15, 16, 17, 18, 19, 20]
  },
  {
    "location": "/src/smallsql/junit/TestLanguage.java",
    "lines": [149, 150, 151, 152, 153, 154, 155, 156, 157, 158]
  },
  {
    "location": "/src/smallsql/junit/TestLanguage.java",
    "lines": [174, 175, 176, 177, 178, 179, 180, 181, 182, 183]
  },
  {
    "location": "/src/smallsql/junit/TestAlterTable2.java",
    "lines": [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
  },
  {
    "location": "/src/smallsql/database/UnionAll.java",
    "lines": [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionLTrim.java",
    "lines": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionRound.java",
    "lines": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionRound.java",
    "lines": [18, 19, 20, 21, 22, 23]
  },
  {
    "location": "/src/smallsql/database/language/Language_de.java",
    "lines": [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
  },
  {
    "location": "/src/smallsql/database/language/Language_de.java",
    "lines": [103, 104, 105, 106, 107, 108]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionReturnString.java",
    "lines": [0, 1, 2, 3, 4]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionReturnString.java",
    "lines": [16, 17, 18, 19, 20, 21]
  },
  {
    "location": "/src/smallsql/database/Columns.java",
    "lines": [21, 22, 23, 24, 25, 26, 27, 28, 29]
  },
  {
    "location": "/src/smallsql/database/Columns.java",
    "lines": [44, 45, 46, 47]
  },
  {
    "location": "/src/smallsql/database/GroupResult.java",
    "lines": [41, 42, 43, 44, 45, 46]
  },
  {
    "location": "/src/smallsql/database/GroupResult.java",
    "lines": [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
  },
  {
    "location": "/src/smallsql/database/GroupResult.java",
    "lines": [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77]
  },
  {
    "location": "/src/smallsql/junit/TestTransactions.java",
    "lines": [19, 20, 21, 22, 23, 24]
  },
  {
    "location": "/src/smallsql/junit/TestTransactions.java",
    "lines": [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]
  },
  {
    "location": "/src/smallsql/junit/TestTransactions.java",
    "lines": [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68]
  },
  {
    "location": "/src/smallsql/junit/TestTransactions.java",
    "lines": [102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129]
  },
  {
    "location": "/src/smallsql/junit/TestTransactions.java",
    "lines": [163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176]
  },
  {
    "location": "/src/smallsql/junit/TestTransactions.java",
    "lines": [199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213]
  },
  {
    "location": "/src/smallsql/junit/TestTransactions.java",
    "lines": [219, 220, 221, 222, 223, 224, 225, 226]
  },
  {
    "location": "/src/smallsql/junit/TestTransactions.java",
    "lines": [230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249]
  },
  {
    "location": "/src/smallsql/junit/TestTransactions.java",
    "lines": [254, 255, 256, 257, 258, 259, 260, 261]
  },
  {
    "location": "/src/smallsql/junit/TestTransactions.java",
    "lines": [267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292]
  },
  {
    "location": "/src/smallsql/junit/TestGroupBy.java",
    "lines": [16, 17, 18, 19, 20, 21, 22, 23]
  },
  {
    "location": "/src/smallsql/junit/TestGroupBy.java",
    "lines": [42, 43, 44, 45, 46, 47, 48, 49]
  },
  {
    "location": "/src/smallsql/junit/TestGroupBy.java",
    "lines": [64, 65, 66, 67, 68, 69, 70]
  },
  {
    "location": "/src/smallsql/junit/TestGroupBy.java",
    "lines": [72, 73, 74, 75, 76, 77, 78, 79]
  },
  {
    "location": "/src/smallsql/junit/TestGroupBy.java",
    "lines": [95, 96, 97, 98, 99, 100, 101]
  },
  {
    "location": "/src/smallsql/junit/TestDeleteUpdate.java",
    "lines": [83, 84, 85, 86, 87, 88, 89, 90]
  },
  {
    "location": "/src/smallsql/database/Expressions.java",
    "lines": [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
  },
  {
    "location": "/src/smallsql/junit/TestMoneyRounding.java",
    "lines": [3, 4, 5, 6, 7, 8, 9]
  },
  {
    "location": "/src/smallsql/database/ExpressionValue.java",
    "lines": [178, 179, 180, 181, 182, 183, 184]
  },
  {
    "location": "/src/smallsql/database/ExpressionValue.java",
    "lines": [417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428]
  },
  {
    "location": "/src/smallsql/database/ExpressionValue.java",
    "lines": [444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455]
  },
  {
    "location": "/src/smallsql/database/ExpressionValue.java",
    "lines": [540, 541, 542, 543, 544, 545, 546]
  },
  {
    "location": "/src/smallsql/junit/BenchTest.java",
    "lines": [561, 562, 563, 564, 565, 566, 567]
  },
  {
    "location": "/src/smallsql/database/SSCallableStatement.java",
    "lines": [77, 78, 79, 80, 81, 82, 83, 84, 85]
  },
  {
    "location": "/src/smallsql/database/SSCallableStatement.java",
    "lines": [91, 92, 93, 94, 95, 96, 97, 98, 99]
  },
  {
    "location": "/src/smallsql/database/SSCallableStatement.java",
    "lines": [123, 124, 125, 126, 127, 128, 129, 130]
  },
  {
    "location": "/src/smallsql/database/SSCallableStatement.java",
    "lines": [143, 144, 145, 146, 147, 148]
  },
  {
    "location": "/src/smallsql/database/SSCallableStatement.java",
    "lines": [190, 191, 192, 193, 194, 195, 196, 197]
  },
  {
    "location": "/src/smallsql/database/SSCallableStatement.java",
    "lines": [209, 210, 211, 212, 213, 214]
  },
  {
    "location": "/src/smallsql/database/SSCallableStatement.java",
    "lines": [276, 277, 278, 279, 280, 281, 282]
  },
  {
    "location": "/src/smallsql/database/SSCallableStatement.java",
    "lines": [324, 325, 326, 327, 328, 329, 330]
  },
  {
    "location": "/src/smallsql/database/ExpressionFunctionRepeat.java",
    "lines": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
  },
  {
    "location": "/src/smallsql/database/SSDatabaseMetaData.java",
    "lines": [54, 55, 56, 57, 58, 59]
  },
  {
    "location": "/src/smallsql/database/SSDatabaseMetaData.java",
    "lines": [97, 98, 99, 100, 101, 102]
  },
  {
    "location": "/src/smallsql/database/SSDatabaseMetaData.java",
    "lines": [424, 425, 426, 427, 428, 429]
  },
  {
    "location": "/src/smallsql/database/SSDatabaseMetaData.java",
    "lines": [498, 499, 500, 501, 502, 503, 504, 505, 506]
  },
  {
    "location": "/src/smallsql/database/SSDatabaseMetaData.java",
    "lines": [517, 518, 519, 520, 521, 522]
  },
  {
    "location": "/src/smallsql/database/Join.java",
    "lines": [25, 26, 27, 28, 29, 30, 31]
  },
  {
    "location": "/src/smallsql/database/Join.java",
    "lines": [57, 58, 59, 60, 61, 62]
  },
  {
    "location": "/src/smallsql/database/Join.java",
    "lines": [77, 78, 79, 80, 81, 82, 83, 84, 85, 86]
  },
  {
    "location": "/src/smallsql/junit/TestOther.java",
    "lines": [59, 60, 61, 62, 63, 64]
  },
  {
    "location": "/src/smallsql/junit/TestOther.java",
    "lines": [88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [40, 41, 42, 43, 44, 45]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [53, 54, 55, 56, 57, 58]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [66, 67, 68, 69, 70, 71]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [510, 511, 512, 513, 514, 515, 516]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [526, 527, 528, 529, 530, 531]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [569, 570, 571, 572, 573, 574, 575]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [624, 625, 626, 627, 628, 629, 630]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [674, 675, 676, 677, 678, 679, 680, 681, 682, 683]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [693, 694, 695, 696, 697, 698, 699, 700, 701, 702]
  },
  {
    "location": "/src/smallsql/database/SQLTokenizer.java",
    "lines": [722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735]
  }];

export const getDuplicationReportDirectories = (duplicationReport) => {
  const directories = {"name": "flare", "children": []};

  const files = getEntriesPerFile(duplicationReport);

  Object.keys(files).forEach((location) => {
    const pieces = _trim(location, '/').split("/")
    const entries = files[location];
    const lines = entries.reduce((lines, entry) => lines.concat(entry.lines), [])

    let currentObject = directories;
    pieces.forEach((piece, i) => {
      const isLast = i === pieces.length - 1;

      if (isLast) {
        currentObject.children.push({name: piece, size: lines.length})
        return;
      }

      const child = currentObject.children.find(child => child.name === piece);

      if (!child) {
        currentObject.children.push({"name": piece, "children": []});
        currentObject = currentObject.children[currentObject.children.length - 1];
        return;
      }

      currentObject = child;

    })
  })

  return directories
}

export const getEntriesPerFile = (duplicationReport) => {
  return _groupBy(duplicationReport, entry => {
    return entry.location;
  })
}