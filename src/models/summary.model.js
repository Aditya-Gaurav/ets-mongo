const mongoose = require('mongoose');

const SummaryModel = mongoose.Schema({
    name: {
        type: String
    },
    lname: {
        type: String
    },
    dep: {
        type: String
    },
    cat: {
        type: String
    },
    desc: {
        type: Array,
        default: undefined
    },
    img: {
        type: Array,
        default: undefined
    },
    attrs: {
        type: Array,
        default: undefined
    },
    sattrs: {
        type: Array,
        default: undefined
    },
    vars: {
        type: Array,
        default: undefined
    }


})

const Summary = mongoose.model('Summary', SummaryModel)

module.exports = Summary;



// {
//     "_id": "3ZZVA46759401P",
//     "name": "Women's Chic - Black Velvet Suede",
//     "lname": "women's chic - black velvet suede",
//     "dep": "84700",
//     "cat": "/84700/80009/1282094266/1200003270",
//     "desc": [
//         {
//             "lang": "en",
//             "val": "This pointy toe slingback features a high quality upper and a classy, simple silhouette. This heel has a classic shape, an adjustable ankle strap for a vintage feel and a secure fit. The Chic is the perfect combination between dressy and professional."
//         }
//     ],
//     "img": [
//         {
//             "height": "330",
//             "src": "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_591726201",
//             "title": "spin_prod_591726201",
//             "width": "450"
//         }
//     ],
//     "attrs": [
//         "heel height=mid (1-3/4 to 2-1/4 in.)",
//         "brand=metaphor"
//     ],
//     "sattrs": [
//         "upper material=synthetic",
//         "toe=open toe"
//     ],
//     "vars": [
//         {
//             "id": "05497884001",
//             "img": [
//                 {
//                     "height": "400",
//                     "src": "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_591726301",
//                     "title": "spin_prod_591726301",
//                     "width": "450"
//                 }
//             ],
//             "attrs": [
//                 "width=medium",
//                 "color=black",
//                 "shoe size=6"
//             ]
//         },
//         {
//             "id": "05497884002",
//             "img": [
//                 {
//                     "height": "400",
//                     "src": "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_591726301",
//                     "title": "spin_prod_591726301",
//                     "width": "450"
//                 }
//             ],
//             "attrs": [
//                 "width=medium",
//                 "color=black",
//                 "shoe size=6.5"
//             ]
//         },
//         {
//             "id": "05497884004",
//             "img": [
//                 {
//                     "height": "400",
//                     "src": "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_591726301",
//                     "title": "spin_prod_591726301",
//                     "width": "450"
//                 }
//             ],
//             "attrs": [
//                 "width=medium",
//                 "color=black",
//                 "shoe size=7.5"
//             ]
//         }
//     ]
// }