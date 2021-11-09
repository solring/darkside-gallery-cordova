import testPic from '../assets/images/emilywang.jpg'

export const mockItem = {
  title: "Title",
  desc: "this is a test",
  height: 320,
  img: testPic,
  tags: ["tag1", "tag2", "tag3"],
}

export const mockCats = [
  {
    category: "fan-art",
    tags: [
      "MOR",
      "JJK",
      "DVD",
      "Golden Kamuy",
      "HP",
      "Others",
    ]
  },
  {
    category: "illustration"
  },
  {
    category: "design",
    tags: [
      "Book cover",
      "T-shirt",
      "Poster",
    ]
  }
]

export const mockState = {
  article: {
    tags: [],
    next: 0,
    articles: [
      {
        ...mockItem,
        img: "https://64.media.tumblr.com/7df3508436bb9f00689a1dfcf6659580/f0c42c2ea6115e7f-69/s2048x3072/a54dd182628ab7ae787dd184167a5b3b82c88efd.jpg",
        height: 0.7,
      },
      {
        ...mockItem,
        img: "https://64.media.tumblr.com/cd1303e066ab9f2fbee1208b9ac6ee18/f9e8a418e50bad19-86/s1280x1920/f9048a8e069bb133be759d69f02ec655306b9f90.jpg",
        height: 1.5,
      },
      {
        ...mockItem,
        img: "https://64.media.tumblr.com/29e9b17f3789bae847b444622b4f5290/03744da6d2deb38f-0d/s2048x3072/f35878be8cc5c8534a64cd9a1a8735629ad35a72.jpg",
        height: 0.2,
      },
      {
        ...mockItem,
        img: "https://64.media.tumblr.com/5cc8387aa8c6c7da1e566ca38bbe4bd4/03744da6d2deb38f-4f/s2048x3072/6484b7723d5c1e1a17fcb9dbec7486b7836fac8e.jpg",
        height: 0.1,
      },
      {
        ...mockItem,
        img: "https://64.media.tumblr.com/193a48d7e23fb95ba49e38059020526d/tumblr_psuh2d3Yxb1vxv7jho1_1280.jpg",
        height: 2,
      },
      {
        ...mockItem,
        img: "https://64.media.tumblr.com/78f434d4d57b2aafbbf2ad59a149d8f6/f3b11346ae0cfd8a-ca/s1280x1920/78afa00340713f0c5ed2708d1b06395aebfe44aa.jpg",
        height: 0.7,
      },
    ]
  }
}

/**
 * randN:
 * produce random number >=1 and <= n
 */
function randN(n) {
  return Math.floor(Math.random() * n) +1
}

function randH() {
  return 150 + Math.floor(Math.random() * 400)
}

export const genItems = (len) =>{
  return Array(len).fill(0).map((e, i) => {
    return {
      ...mockItem,
      tags: Array(randN(7)).fill(0).map((e, i) => `tag${i}`),
      height: randH(),
    }
  })
}

export const genItemsStatic = (len) =>{
  return Array(len).fill(0).map((e, i) => {
    return {
      ...mockItem,
    }
  })
}