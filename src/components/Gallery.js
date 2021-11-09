import React, { useState, useMemo, useContext, useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { clear, fetchArticle } from '../reduxSlice/articleSlice'
import { AJAX_STATUES_LOADING } from '../reduxSlice/fetchStatus'
import api, { GetCategories } from '../api/api'

import { useAsync, useMedia } from 'react-use'

import useWindowSize from '../hooks/useWindowSize'

import GradientScrollable from './GradientScrollable'
import NavTabs from './NavTabs'
import NavTabsFullscreen from './NavTabsFullscreen'
import PicGrid from './PicGrid'
import Loading from './Loading'

import * as vars from '../utils/constants'
import ThemeContext from '../context/ThemeContext'

/**
 * Filter articles locally with selected tags.
 * Should change to server-side filter with cache in the future.
 * @articles : list of article objects retrieved from server
 * @tags     : a dictionary(object) with true/false values,
 *             the names of tags(str) being the keys.
 */
function filterArticle(articles, tags) {
  if(!tags) return articles

  let keys = Object.keys(tags)
  if (keys.map((k) => tags[k]).reduce((a, b) => a || b, false) === false)
    return articles

  return articles.filter((a) => {
    if (!a['tags']) return false

    for (let t of a['tags']) { // for every tag str of the article
      if(tags[t]) return true
    }
    return false
  })
}

function Gallery(props) {

  /**
   * Init and hooks
   */
  // theme
  const {gradient1, gradient2} = useContext(ThemeContext)
  
  // UI
  const {height} = useWindowSize()

  // redux
  const {articles, next, status, exhausted} = useSelector(state => state.article)
  const dispatch = useDispatch()

  const [scroll, setScroll] = useState([0, 0])
  const [on, setOn] = useState(false)
  const isPhone = useMedia(`(max-width: ${vars.BS_BREAKPOINT_MD})`)

  // selected category/tags
  const [cat, setCat] = useState(-1) // :int
  const [tags, setTags] = useState(null) // :object

  // filtered data
  const filtered = useMemo(() => filterArticle(articles, tags), [articles, tags])

  // init: load tag list
  const tagsLoading = useAsync(async () => {
    console.log("load tags...")
    return await api(GetCategories())
  }, [])
  const cats = tagsLoading.value

  /**
   * Helper functions
   */
  const doLoadArticles = useCallback((start, category) => {
    if (!exhausted) {
      dispatch(fetchArticle({
        start: start,
        category: category,
        length: vars.ARTICLE_BATCH_LEN,
      }))
    }
  }, [exhausted, dispatch])

  /**
   * Handlers
   */
  const loadMoreArticles = useCallback(() => {
    doLoadArticles(next, cat === -1 ? "" : cats[cat].category)
  }, [cat, cats, next, doLoadArticles])

  const onSelect = (idx) => {

    // clear articles and reload every time switching category
    dispatch(clear())

    if(cat !== idx) { // if switch category
      setCat(idx)
      if (cats[idx].tags && Array.isArray(cats[idx].tags)) {
        let obj = {}
        cats[idx].tags.map((t) => { obj[t] = false; return 0 })
        setTags(obj)
      } else {
        setTags(null)
      }
    }
    else {
      setCat(-1)
      setTags(null)
    }
  }

  const onTagSelect = (t, idx) => {
    setTags({...tags, [t]: !tags[t]})
  }

  const onScroll = useCallback((x, y) => {
    setScroll([x, y])
  }, [setScroll])

  return (
    <div className="h-100" >
      <GradientScrollable
        color1={gradient1}
        color2={gradient2}
        height={height}
        onScroll={onScroll}>

        { tagsLoading.loading ? <Loading />
          : tagsLoading.error ? <p className="text-light text-center py-4">Oops...failed to load tags.</p>
          : isPhone ?
            <NavTabsFullscreen
              toggle={on}
              items={cats}
              selected={cat}
              selectedTags={tags}
              onSelect={onSelect}
              onTagSelect={onTagSelect}
              onClose={() => setOn(false)}
            />
          :
            <NavTabs
              items={cats}
              selected={cat}
              selectedTags={tags}
              onSelect={onSelect}
              onTagSelect={onTagSelect}
              scrollPos={scroll[1]}
            />
        }

        <PicGrid
          className={isPhone ? "mt-5" : ""}
          items={filtered}
          onExhausted={loadMoreArticles}
        />

        {status === AJAX_STATUES_LOADING &&
          <Loading />
        }

        { isPhone &&
          <button
            className="btn btn-primary btn-lg rounded-pill border-0 position-fixed end-0 top-0 me-3 mt-5 lh-1 shadow-btn"
            style={{zIndex: 1010, backgroundColor: gradient1}}
            onClick={() => setOn(true)}
          >
            <h5 className="text-uppercase">
              { cat === -1 ? ":" : `${cats[cat].category}`}
            </h5>
          </button>
        }
      </GradientScrollable>
    </div>
  )
}

export default Gallery

