import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { CommonProps } from "../../../../common/props"
import { useEffect, useState } from "react"
import "./MainFilter.scss";

export const MainFilter = (props: CommonProps) => {
  type SortingType = 'Date' | 'Rating';
  type ContentType = 'Video game' | 'Board game'
  const types: Array<SortingType> = ['Date', 'Rating'];
  const content: Array<ContentType> = ['Board game', 'Video game']
  const [search, setSearch] = useState('');
  const [sortingType, setSortingType] = useState<SortingType | undefined>('Date');
  const [contentType, setContentType] = useState<ContentType | undefined>('Video game');
  return (
  <div className={`${props.className} filter__wrapper`}>
    <div className="filter__search-block">
      <TextField 
        className="filter__search-input"
        label="Search"
        fullWidth
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }} 
      />
    </div>
    <div className="filter__sorting-block">
      <div className="sorting-block__part">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="filter-input-label">Sorting by</InputLabel>
        <Select
          size="small"
          labelId="filter-input-label"
          variant="standard"
          label="Sorting by"
          value={sortingType}
          onChange={(e) => setSortingType(e.target.value as SortingType)}
        >
            {types.map((x) => <MenuItem value={x}>{x}</MenuItem>)}
        </Select>
      </FormControl>
      </div>
      <div className="sorting-block__part">
        <FormControl variant="standard" sx={{m: 1, minWidth: 120}} >
          <InputLabel>Content type</InputLabel>
          <Select
            size="small"
            labelId="filter-type-label"
            variant="standard"
            value={contentType}
            onChange={(e) => setContentType(e.target.value as ContentType)}
          >
            {content.map((x) => <MenuItem value={x}>{x}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    </div>    
  </div>
  )
}