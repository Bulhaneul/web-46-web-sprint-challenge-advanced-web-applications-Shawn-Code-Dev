import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorService = async (setColors) => {
  await axiosWithAuth().get('/colors')
  .then(res => {
    setColors(res.data)
  })
}

export default fetchColorService;