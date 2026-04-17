// Movie playlists — real movie names, YouTube video URLs (no copyrighted audio files)
// audioUrl uses royalty-free demo audio from pixabay/freesound CDN
const DEMO = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const DEMO2 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
const DEMO3 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";

export const moviePlaylists = [
  // ── ENGLISH ──────────────────────────────────────────────────────────
  {
    id: "mp-001", movie: "Interstellar", language: "English", genre: "Sci-Fi",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    songs: [
      { id: "s001", title: "Cornfield Chase", artist: "Hans Zimmer", videoUrl: "https://www.youtube.com/watch?v=4y33h81phKU", audioUrl: DEMO, duration: "2:06" },
      { id: "s002", title: "Dust", artist: "Hans Zimmer", videoUrl: "https://www.youtube.com/watch?v=XiKWfBnMBPw", audioUrl: DEMO2, duration: "3:30" },
      { id: "s003", title: "Day One", artist: "Hans Zimmer", videoUrl: "https://www.youtube.com/watch?v=UDVtMYqUAyw", audioUrl: DEMO3, duration: "4:12" },
    ],
  },
  {
    id: "mp-002", movie: "The Dark Knight", language: "English", genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    songs: [
      { id: "s004", title: "Why So Serious?", artist: "Hans Zimmer", videoUrl: "https://www.youtube.com/watch?v=6uOaVERCFkU", audioUrl: DEMO, duration: "9:14" },
      { id: "s005", title: "A Dark Knight", artist: "Hans Zimmer", videoUrl: "https://www.youtube.com/watch?v=RQmzn_IQHSY", audioUrl: DEMO2, duration: "5:50" },
    ],
  },
  {
    id: "mp-003", movie: "Inception", language: "English", genre: "Sci-Fi",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    songs: [
      { id: "s006", title: "Time", artist: "Hans Zimmer", videoUrl: "https://www.youtube.com/watch?v=RxabLA7UQ9k", audioUrl: DEMO3, duration: "4:35" },
      { id: "s007", title: "Dream Is Collapsing", artist: "Hans Zimmer", videoUrl: "https://www.youtube.com/watch?v=ILqsHCEICbo", audioUrl: DEMO, duration: "2:23" },
    ],
  },
  {
    id: "mp-004", movie: "Avengers: Endgame", language: "English", genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    songs: [
      { id: "s008", title: "Portals", artist: "Alan Silvestri", videoUrl: "https://www.youtube.com/watch?v=LucQ-bIBDZ4", audioUrl: DEMO2, duration: "3:42" },
      { id: "s009", title: "Avengers Theme", artist: "Alan Silvestri", videoUrl: "https://www.youtube.com/watch?v=7wd5KEaOtm0", audioUrl: DEMO3, duration: "2:55" },
    ],
  },
  {
    id: "mp-005", movie: "La La Land", language: "English", genre: "Musical",
    poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    songs: [
      { id: "s010", title: "City of Stars", artist: "Ryan Gosling & Emma Stone", videoUrl: "https://www.youtube.com/watch?v=0pdqf4P9MB8", audioUrl: DEMO, duration: "3:26" },
      { id: "s011", title: "Another Day of Sun", artist: "Cast of La La Land", videoUrl: "https://www.youtube.com/watch?v=CW4tJMCCMiI", audioUrl: DEMO2, duration: "4:10" },
    ],
  },
  {
    id: "mp-006", movie: "The Lion King", language: "English", genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    songs: [
      { id: "s012", title: "Circle of Life", artist: "Elton John", videoUrl: "https://www.youtube.com/watch?v=GibiNy4d4gc", audioUrl: DEMO3, duration: "3:58" },
      { id: "s013", title: "Can You Feel the Love Tonight", artist: "Elton John", videoUrl: "https://www.youtube.com/watch?v=M5jE46TqA0E", audioUrl: DEMO, duration: "3:59" },
    ],
  },
  {
    id: "mp-007", movie: "Titanic", language: "English", genre: "Romance",
    poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    songs: [
      { id: "s014", title: "My Heart Will Go On", artist: "Celine Dion", videoUrl: "https://www.youtube.com/watch?v=FOSZstbm9GQ", audioUrl: DEMO2, duration: "4:40" },
      { id: "s015", title: "Rose", artist: "James Horner", videoUrl: "https://www.youtube.com/watch?v=Oy_6YDXM5Oc", audioUrl: DEMO3, duration: "3:12" },
    ],
  },
  {
    id: "mp-008", movie: "Guardians of the Galaxy", language: "English", genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
    songs: [
      { id: "s016", title: "Hooked on a Feeling", artist: "Blue Swede", videoUrl: "https://www.youtube.com/watch?v=PJQVlVHsFF8", audioUrl: DEMO, duration: "2:54" },
      { id: "s017", title: "Come and Get Your Love", artist: "Redbone", videoUrl: "https://www.youtube.com/watch?v=4qBqmxBTNYA", audioUrl: DEMO2, duration: "3:28" },
    ],
  },
  {
    id: "mp-009", movie: "Bohemian Rhapsody", language: "English", genre: "Biography",
    poster: "https://image.tmdb.org/t/p/w500/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg",
    songs: [
      { id: "s018", title: "Bohemian Rhapsody", artist: "Queen", videoUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ", audioUrl: DEMO3, duration: "5:55" },
      { id: "s019", title: "We Will Rock You", artist: "Queen", videoUrl: "https://www.youtube.com/watch?v=-tJYN-eG1zk", audioUrl: DEMO, duration: "2:02" },
    ],
  },
  {
    id: "mp-010", movie: "Frozen", language: "English", genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg",
    songs: [
      { id: "s020", title: "Let It Go", artist: "Idina Menzel", videoUrl: "https://www.youtube.com/watch?v=moSFlvxnbgk", audioUrl: DEMO2, duration: "3:44" },
      { id: "s021", title: "Do You Want to Build a Snowman?", artist: "Cast of Frozen", videoUrl: "https://www.youtube.com/watch?v=TbwlC2B-BIg", audioUrl: DEMO3, duration: "3:26" },
    ],
  },

  // ── HINDI ─────────────────────────────────────────────────────────────
  {
    id: "mp-011", movie: "Dilwale Dulhania Le Jayenge", language: "Hindi", genre: "Romance",
    poster: "https://image.tmdb.org/t/p/w500/kSBXou5Ac7vEqKd97wotJumyJvU.jpg",
    songs: [
      { id: "s022", title: "Tujhe Dekha To", artist: "Kumar Sanu, Lata Mangeshkar", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "5:30" },
      { id: "s023", title: "Mehndi Laga Ke Rakhna", artist: "Kavita Krishnamurthy", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "5:10" },
    ],
  },
  {
    id: "mp-012", movie: "3 Idiots", language: "Hindi", genre: "Comedy-Drama",
    poster: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg",
    songs: [
      { id: "s024", title: "Aal Izz Well", artist: "Sonu Nigam, Shaan, Swanand Kirkire", videoUrl: "https://www.youtube.com/watch?v=0N_RO-jL-90", audioUrl: DEMO3, duration: "4:28" },
      { id: "s025", title: "Behti Hawa Sa Tha Woh", artist: "Shaan", videoUrl: "https://www.youtube.com/watch?v=K0ffAbKMvEo", audioUrl: DEMO, duration: "4:02" },
    ],
  },
  {
    id: "mp-013", movie: "Kabhi Khushi Kabhie Gham", language: "Hindi", genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/wVTYlkKPKrljJfugXN7UlLNjtuJ.jpg",
    songs: [
      { id: "s026", title: "Kabhi Khushi Kabhie Gham", artist: "Lata Mangeshkar", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "5:45" },
      { id: "s027", title: "You Are My Soniya", artist: "Sonu Nigam, Alka Yagnik", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "4:55" },
    ],
  },
  {
    id: "mp-014", movie: "Lagaan", language: "Hindi", genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/aEtDz2YRFK4PQMDGkBEMFikBHwN.jpg",
    songs: [
      { id: "s028", title: "Ghanan Ghanan", artist: "Udit Narayan, Alka Yagnik", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "5:20" },
      { id: "s029", title: "Mitwa", artist: "Udit Narayan", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "4:40" },
    ],
  },
  {
    id: "mp-015", movie: "Rockstar", language: "Hindi", genre: "Musical",
    poster: "https://image.tmdb.org/t/p/w500/A4gL3WT9HGbDqQjYwBmDFRvnJpZ.jpg",
    songs: [
      { id: "s030", title: "Nadaan Parindey", artist: "Mohit Chauhan", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "5:10" },
      { id: "s031", title: "Sadda Haq", artist: "Mohit Chauhan", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "4:30" },
    ],
  },
  {
    id: "mp-016", movie: "Zindagi Na Milegi Dobara", language: "Hindi", genre: "Adventure",
    poster: "https://image.tmdb.org/t/p/w500/kcJFNFBFGFBLDNRMnqTpUrhtykv.jpg",
    songs: [
      { id: "s032", title: "Senorita", artist: "Farhan Akhtar", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "4:15" },
      { id: "s033", title: "Ik Junoon", artist: "Farhan Akhtar, Ehsaan, Loy", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "4:50" },
    ],
  },
  {
    id: "mp-017", movie: "Dil Chahta Hai", language: "Hindi", genre: "Comedy",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s034", title: "Dil Chahta Hai", artist: "Shankar Mahadevan", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "4:20" },
      { id: "s035", title: "Jaane Kyun", artist: "KK", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "5:00" },
    ],
  },
  {
    id: "mp-018", movie: "Mughal-E-Azam", language: "Hindi", genre: "Historical",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s036", title: "Pyar Kiya To Darna Kya", artist: "Lata Mangeshkar", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "5:30" },
    ],
  },
  {
    id: "mp-019", movie: "Gangs of Wasseypur", language: "Hindi", genre: "Crime",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s037", title: "Ik Bagal Mein Chand Hoga", artist: "Piyush Mishra", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "4:10" },
      { id: "s038", title: "Womaniya", artist: "Rekha Bhardwaj", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "3:50" },
    ],
  },
  {
    id: "mp-020", movie: "Bajrangi Bhaijaan", language: "Hindi", genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s039", title: "Bhar Do Jholi Meri", artist: "Adnan Sami", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "5:20" },
      { id: "s040", title: "Tu Jo Mila", artist: "KK", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "4:30" },
    ],
  },

  // ── TAMIL ─────────────────────────────────────────────────────────────
  {
    id: "mp-021", movie: "Enthiran", language: "Tamil", genre: "Sci-Fi",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s041", title: "Kilimanjaro", artist: "Benny Dayal, Shreya Ghoshal", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "4:45" },
      { id: "s042", title: "Irumbile Oru Irudhaiyam", artist: "Naresh Iyer", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "5:00" },
    ],
  },
  {
    id: "mp-022", movie: "Vikram", language: "Tamil", genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s043", title: "Pathala Pathala", artist: "Anirudh Ravichander", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "3:55" },
      { id: "s044", title: "Vikram Title Track", artist: "Anirudh Ravichander", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "3:20" },
    ],
  },
  {
    id: "mp-023", movie: "Mersal", language: "Tamil", genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s045", title: "Aalaporaan Tamizhan", artist: "Anirudh Ravichander", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "4:10" },
      { id: "s046", title: "Neethanae", artist: "Sid Sriram", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "4:50" },
    ],
  },
  {
    id: "mp-024", movie: "96", language: "Tamil", genre: "Romance",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s047", title: "Kannazhaga", artist: "Govind Vasantha", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "4:30" },
      { id: "s048", title: "Idhayame", artist: "Govind Vasantha", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "4:15" },
    ],
  },
  {
    id: "mp-025", movie: "Kaala", language: "Tamil", genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s049", title: "Semma Weightu", artist: "Anirudh Ravichander", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "3:40" },
    ],
  },
  {
    id: "mp-026", movie: "Bigil", language: "Tamil", genre: "Sports",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s050", title: "Verithanam", artist: "Anirudh Ravichander", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "4:00" },
      { id: "s051", title: "Singappenney", artist: "Sid Sriram", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "4:20" },
    ],
  },
  {
    id: "mp-027", movie: "Roja", language: "Tamil", genre: "Romance",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s052", title: "Roja Jaaneman", artist: "S.P. Balasubrahmanyam", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "5:10" },
    ],
  },
  {
    id: "mp-028", movie: "Vinnaithaandi Varuvaayaa", language: "Tamil", genre: "Romance",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s053", title: "Aaromale", artist: "Alphons Joseph", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "4:55" },
      { id: "s054", title: "Omana Penne", artist: "Haricharan", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "4:30" },
    ],
  },
  {
    id: "mp-029", movie: "Kaithi", language: "Tamil", genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s055", title: "Kaithi BGM", artist: "Sam C.S.", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "3:00" },
    ],
  },
  {
    id: "mp-030", movie: "Ponniyin Selvan", language: "Tamil", genre: "Historical",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s056", title: "Ponni Nadhi", artist: "A.R. Rahman", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "4:40" },
      { id: "s057", title: "Chola Chola", artist: "A.R. Rahman", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "4:10" },
    ],
  },

  // ── MALAYALAM ─────────────────────────────────────────────────────────
  {
    id: "mp-031", movie: "Premam", language: "Malayalam", genre: "Romance",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s058", title: "Malare", artist: "Vijay Yesudas", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "4:20" },
      { id: "s059", title: "Aluva Puzha", artist: "Sithara Krishnakumar", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "4:00" },
    ],
  },
  {
    id: "mp-032", movie: "Drishyam", language: "Malayalam", genre: "Thriller",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s060", title: "Kanmaniye Pesum", artist: "Haricharan", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "4:30" },
    ],
  },
  {
    id: "mp-033", movie: "Bangalore Days", language: "Malayalam", genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s061", title: "Oru Adaar Love", artist: "Vineeth Sreenivasan", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "4:10" },
      { id: "s062", title: "Bangalore Nagaradalli", artist: "Gopi Sundar", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "3:55" },
    ],
  },
  {
    id: "mp-034", movie: "Kumbalangi Nights", language: "Malayalam", genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s063", title: "Njandukalude Naattil Oridavela", artist: "Sushin Shyam", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "4:25" },
    ],
  },
  {
    id: "mp-035", movie: "Lucifer", language: "Malayalam", genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s064", title: "Ente Rajyam", artist: "Deepak Dev", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "3:50" },
    ],
  },
  {
    id: "mp-036", movie: "Trance", language: "Malayalam", genre: "Thriller",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s065", title: "Uyire Uyire", artist: "Sushin Shyam", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "4:15" },
    ],
  },
  {
    id: "mp-037", movie: "Minnal Murali", language: "Malayalam", genre: "Superhero",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s066", title: "Minnal Murali Theme", artist: "Sushin Shyam", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "3:30" },
    ],
  },
  {
    id: "mp-038", movie: "Ustad Hotel", language: "Malayalam", genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s067", title: "Ente Mezhuthiri", artist: "Vineeth Sreenivasan", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "4:40" },
    ],
  },
  {
    id: "mp-039", movie: "Uyare", language: "Malayalam", genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s068", title: "Uyare Title Track", artist: "Gopi Sundar", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "4:00" },
    ],
  },
  {
    id: "mp-040", movie: "Virus", language: "Malayalam", genre: "Thriller",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s069", title: "Virus BGM", artist: "Sushin Shyam", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "3:20" },
    ],
  },

  // ── ARABIC ────────────────────────────────────────────────────────────
  {
    id: "mp-041", movie: "The Yacoubian Building", language: "Arabic", genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s070", title: "Ya Msafer Wahdak", artist: "Abdel Halim Hafez", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "5:00" },
    ],
  },
  {
    id: "mp-042", movie: "Capernaum", language: "Arabic", genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s071", title: "Capernaum Theme", artist: "Khaled Mouzanar", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "3:45" },
    ],
  },
  {
    id: "mp-043", movie: "Omar", language: "Arabic", genre: "Thriller",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s072", title: "Omar Soundtrack", artist: "Habib Shehadeh Hanna", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "4:10" },
    ],
  },
  {
    id: "mp-044", movie: "Theeb", language: "Arabic", genre: "Adventure",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s073", title: "Desert Wind", artist: "Jerry Lane", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "3:30" },
    ],
  },
  {
    id: "mp-045", movie: "Clash", language: "Arabic", genre: "Thriller",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s074", title: "Clash Theme", artist: "Hisham Nazih", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "3:55" },
    ],
  },
  {
    id: "mp-046", movie: "Microphone", language: "Arabic", genre: "Musical",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s075", title: "Alexandria Underground", artist: "Various Artists", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "4:20" },
    ],
  },
  {
    id: "mp-047", movie: "Wadjda", language: "Arabic", genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s076", title: "Wadjda Theme", artist: "Max Richter", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "3:40" },
    ],
  },
  {
    id: "mp-048", movie: "The Idol", language: "Arabic", genre: "Biography",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s077", title: "Gaza Sings", artist: "Mohammed Assaf", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO2, duration: "4:30" },
    ],
  },
  {
    id: "mp-049", movie: "Amreeka", language: "Arabic", genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s078", title: "Amreeka Theme", artist: "Kareem Roustom", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO3, duration: "3:50" },
    ],
  },
  {
    id: "mp-050", movie: "Paradise Now", language: "Arabic", genre: "Thriller",
    poster: "https://image.tmdb.org/t/p/w500/3bhkHMhxnDIRGHz9LMnkNKhFGnY.jpg",
    songs: [
      { id: "s079", title: "Paradise Now Score", artist: "Jina Sumedi", videoUrl: "https://www.youtube.com/watch?v=Vy8KFqBMFkE", audioUrl: DEMO, duration: "4:05" },
    ],
  },
];

export const LANGUAGES = ["All", "English", "Hindi", "Tamil", "Malayalam", "Arabic"];
export const GENRES = ["All", ...new Set(moviePlaylists.map((p) => p.genre))];
