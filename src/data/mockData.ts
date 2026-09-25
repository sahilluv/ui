export interface StoryItem {
  id: string;
  username: string;
  gradient: string;
  avatarGradient: string;
  isCurrentUser?: boolean;
  hasUnseen?: boolean;
  imageUrl?: string;
  storyImageUrl?: string;
}

export interface ReelItem {
  id: string;
  author: {
    name: string;
    username: string;
    location: string;
    avatarGradient: string;
  };
  gradient: string;
  likes: string;
  likesCount: number;
  comments: string;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface PostItem {
  id: string;
  author: {
    name: string;
    username: string;
    avatarGradient: string;
    location?: string;
  };
  timeAgo: string;
  gradient: string;
  imageStyle?: string;
  likesCount: number;
  commentsCount: number;
  likedByText: string;
  captionTitle: string;
  captionBody: string;
  totalPages?: number;
  currentPage?: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface CategoryItem {
  id: string;
  title: string;
  iconName: string;
  gradient: string;
}

export interface ExploreCard {
  id: string;
  heightClass: string;
  gradient: string;
  title: string;
  category: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  gradient: string;
  isAdd?: boolean;
}

export interface NotificationItem {
  id: string;
  user: {
    name: string;
    username: string;
    avatarGradient: string;
  };
  actionType: 'like' | 'comment' | 'follow' | 'mention';
  content: string;
  timeAgo: string;
  postThumbnailGradient?: string;
  isRead: boolean;
}

export const INITIAL_STORIES: StoryItem[] = [
  {
    id: 'user_story',
    username: 'Tu historia',
    gradient: 'linear-gradient(135deg, #6B11FF 0%, #B026FF 50%, #FF2D55 100%)',
    avatarGradient: 'linear-gradient(135deg, #5B1CE6 0%, #A811DA 50%, #FF0A78 100%)',
    isCurrentUser: true,
  },
  {
    id: 'story_luz',
    username: 'Luz.anzo',
    gradient: 'linear-gradient(135deg, #FF5E62 0%, #FF7F50 50%, #FFA07A 100%)',
    avatarGradient: 'linear-gradient(135deg, #FF0A78 0%, #FF7F50 100%)',
  },
  {
    id: 'story_alice',
    username: 'Alice_002',
    gradient: 'linear-gradient(135deg, #791DA6 0%, #A21CAF 50%, #E11D48 100%)',
    avatarGradient: 'linear-gradient(135deg, #FF0A78 0%, #7928CA 100%)',
  },
  {
    id: 'story_perla',
    username: 'Perla_Pipol',
    gradient: 'linear-gradient(135deg, #3B0764 0%, #581C87 50%, #7E22CE 100%)',
    avatarGradient: 'linear-gradient(135deg, #FF0A78 0%, #9333EA 100%)',
  },
  {
    id: 'story_carlos',
    username: 'Carlos_v',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #6366F1 100%)',
    avatarGradient: 'linear-gradient(135deg, #06B6D4 0%, #6366F1 100%)',
  },
];

export const INITIAL_POSTS: PostItem[] = [
  {
    id: 'post_maoo',
    author: {
      name: 'Maoo Lopez',
      username: 'Maoo.lopez',
      avatarGradient: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
    },
    timeAgo: 'Hace 20 min',
    gradient: 'linear-gradient(180deg, #531B82 0%, #7622B3 35%, #A81EBF 65%, #FF0A78 100%)',
    likesCount: 4558,
    commentsCount: 500,
    likedByText: 'danieldelax y 4,588 personas más',
    captionTitle: 'SACRIFICE | VIRUS',
    captionBody: 'this photomanipulation inspired in the virus',
    totalPages: 3,
    currentPage: 1,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'post_eliott',
    author: {
      name: 'Eliott Johnson',
      username: 'Eliott Johnson',
      avatarGradient: 'linear-gradient(135deg, #7A58E6 0%, #B77DE8 100%)',
      location: 'Madrid, Spain',
    },
    timeAgo: 'Hace 2 h',
    gradient: 'linear-gradient(135deg, #7A58E6 0%, #B77DE8 35%, #F5A7C4 70%, #FCD5B5 100%)',
    likesCount: 2420,
    commentsCount: 175,
    likedByText: 'sofia_art y 2,419 personas más',
    captionTitle: 'ETHEREAL LIGHT',
    captionBody: 'Capturing sunset reflections across the skyline of Madrid.',
    totalPages: 1,
    currentPage: 1,
    isLiked: true,
    isSaved: true,
  },
  {
    id: 'post_christian',
    author: {
      name: 'Christian Lue',
      username: 'Christian Lue',
      avatarGradient: 'linear-gradient(135deg, #D97706 0%, #78350F 100%)',
      location: 'Ghent, Belgium',
    },
    timeAgo: 'Hace 5 h',
    gradient: 'linear-gradient(135deg, #3A2C27 0%, #5C3E33 40%, #855E4E 75%, #1F1714 100%)',
    likesCount: 1890,
    commentsCount: 94,
    likedByText: 'marco.visuals y 1,889 personas más',
    captionTitle: 'BRUTALIST FORMS',
    captionBody: 'Studies in concrete, shadow, and architectural permanence.',
    totalPages: 1,
    currentPage: 1,
    isLiked: false,
    isSaved: false,
  },
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'igtv',
    title: 'IGTV',
    iconName: 'Tv',
    gradient: 'linear-gradient(135deg, #7928CA 0%, #A855F7 100%)',
  },
  {
    id: 'tienda',
    title: 'TIENDA',
    iconName: 'ShoppingBag',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
  },
  {
    id: 'viajes',
    title: 'VIAJES',
    iconName: 'Plane',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
  },
  {
    id: 'fitness',
    title: 'FITNESS',
    iconName: 'Dumbbell',
    gradient: 'linear-gradient(135deg, #F97316 0%, #FB7185 100%)',
  },
];

export const EXPLORE_CARDS: ExploreCard[] = [
  {
    id: 'exp_1',
    heightClass: 'h-44',
    gradient: 'linear-gradient(145deg, #2E3B4A 0%, #202A36 50%, #161D26 100%)',
    title: 'Slate Architecture',
    category: 'Architecture',
  },
  {
    id: 'exp_2',
    heightClass: 'h-38',
    gradient: 'linear-gradient(145deg, #282148 0%, #1C1736 50%, #120E26 100%)',
    title: 'Deep Obsidian',
    category: 'Abstract',
  },
  {
    id: 'exp_3',
    heightClass: 'h-40',
    gradient: 'linear-gradient(145deg, #184855 0%, #113843 50%, #0B252D 100%)',
    title: 'Dark Teal Depth',
    category: 'Cyber',
  },
  {
    id: 'exp_4',
    heightClass: 'h-36',
    gradient: 'linear-gradient(145deg, #4E1E57 0%, #381440 50%, #250C2B 100%)',
    title: 'Plum Noir',
    category: 'Design',
  },
  {
    id: 'exp_5',
    heightClass: 'h-50',
    gradient: 'linear-gradient(145deg, #6B21A8 0%, #9333EA 35%, #D946EF 70%, #FF0A78 100%)',
    title: 'Cyberwave Magenta',
    category: 'Nature',
  },
  {
    id: 'exp_6',
    heightClass: 'h-32',
    gradient: 'linear-gradient(145deg, #155E75 0%, #0E7490 50%, #0891B2 100%)',
    title: 'Teal Aurora',
    category: 'Editorial',
  },
  {
    id: 'exp_7',
    heightClass: 'h-36',
    gradient: 'linear-gradient(145deg, #831843 0%, #9D174D 50%, #BE185D 100%)',
    title: 'Rose Berry',
    category: 'Art',
  },
];

export const HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'hl_1',
    title: 'Mejores fotos',
    gradient: 'linear-gradient(145deg, #101B2B 0%, #1A2E44 50%, #203A56 100%)',
    isAdd: true,
  },
  {
    id: 'hl_2',
    title: 'Mis cosas',
    gradient: 'linear-gradient(145deg, #0D4E5B 0%, #147D8E 50%, #22A6B3 100%)',
  },
  {
    id: 'hl_3',
    title: 'Chidos',
    gradient: 'linear-gradient(145deg, #1A2228 0%, #2B3842 50%, #3D4E5B 100%)',
  },
  {
    id: 'hl_4',
    title: 'Comida',
    gradient: 'linear-gradient(145deg, #0E2231 0%, #17364D 50%, #1F4968 100%)',
  },
];

export const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 'notif_1',
    user: {
      name: 'Elena Rostova',
      username: 'Elena.art',
      avatarGradient: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 50%, #FB7185 100%)',
    },
    actionType: 'like',
    content: 'le gustó tu publicación "SACRIFICE | VIRUS"',
    timeAgo: 'Hace 5 min',
    postThumbnailGradient: 'linear-gradient(135deg, #4E137D 0%, #991BEA 50%, #FF0A78 100%)',
    isRead: false,
  },
  {
    id: 'notif_2',
    user: {
      name: 'Carlos Valenzuela',
      username: 'Carlos_v',
      avatarGradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #6366F1 100%)',
    },
    actionType: 'comment',
    content: 'comentó: "La paleta de color y la composición son increíbles 🔥"',
    timeAgo: 'Hace 23 min',
    postThumbnailGradient: 'linear-gradient(135deg, #4E137D 0%, #991BEA 50%, #FF0A78 100%)',
    isRead: false,
  },
  {
    id: 'notif_3',
    user: {
      name: 'Sofia Mendez',
      username: 'sofia_art',
      avatarGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #78350F 100%)',
    },
    actionType: 'follow',
    content: 'ha comenzado a seguirte.',
    timeAgo: 'Hace 2 h',
    isRead: true,
  },
  {
    id: 'notif_4',
    user: {
      name: 'Marco Rossi',
      username: 'marco.visuals',
      avatarGradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)',
    },
    actionType: 'like',
    content: 'y a 45 personas más les gustó tu historia.',
    timeAgo: 'Hace 4 h',
    postThumbnailGradient: 'linear-gradient(135deg, #7A58E6 0%, #B77DE8 50%, #F5A7C4 100%)',
    isRead: true,
  },
  {
    id: 'notif_5',
    user: {
      name: 'Alice Cooper',
      username: 'Alice_002',
      avatarGradient: 'linear-gradient(135deg, #C026D3 0%, #7928CA 50%, #3B82F6 100%)',
    },
    actionType: 'mention',
    content: 'te mencionó en un comentario: "@tu.perfil checa esto"',
    timeAgo: 'Ayer',
    isRead: true,
  },
];

export const INITIAL_REELS: ReelItem[] = [
  {
    id: 'reel_eliott',
    author: {
      name: 'Eliott Johnson',
      username: 'eliott.j',
      location: 'Madrid, Spain',
      avatarGradient: 'linear-gradient(135deg, #3A3B4D 0%, #252636 100%)',
    },
    gradient: 'linear-gradient(180deg, #7E729F 0%, #B896B8 30%, #E3B2C6 65%, #F5D3DC 100%)',
    likes: '2,4k',
    likesCount: 2400,
    comments: '175',
    commentsCount: 175,
    isLiked: true,
    isSaved: false,
  },
  {
    id: 'reel_christian',
    author: {
      name: 'Christian Lue',
      username: 'christian.lue',
      location: 'Ghent, Belgium',
      avatarGradient: 'linear-gradient(135deg, #443B36 0%, #2A2320 100%)',
    },
    gradient: 'linear-gradient(180deg, #463B36 0%, #68584F 35%, #927C6F 70%, #BBA496 100%)',
    likes: '1,8k',
    likesCount: 1800,
    comments: '92',
    commentsCount: 92,
    isLiked: false,
    isSaved: true,
  },
  {
    id: 'reel_sofia',
    author: {
      name: 'Sofia Martinez',
      username: 'sofia.mtz',
      location: 'Tokyo, Japan',
      avatarGradient: 'linear-gradient(135deg, #1B2A4A 0%, #0F1829 100%)',
    },
    gradient: 'linear-gradient(180deg, #1E3A8A 0%, #3B82F6 40%, #60A5FA 70%, #93C5FD 100%)',
    likes: '3,9k',
    likesCount: 3900,
    comments: '340',
    commentsCount: 340,
    isLiked: false,
    isSaved: false,
  },
];

