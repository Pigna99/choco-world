import { generateArrayFrame } from '@/utils/frontend/utilsFrontend'
import React from 'react'
const pathFrames = generateArrayFrame(1)

const egg0 = () => {
    return (
        <path stroke="#000000" d="M94 75h18M94 76h18M94 77h18M94 78h18M94 79h18M94 80h18M87 81h7M112 81h7M87 82h7M112 82h7M87 83h7M112 83h7M87 84h7M112 84h7M87 85h7M112 85h7M87 86h7M112 86h7M81 87h6M119 87h6M81 88h6M119 88h6M81 89h6M119 89h6M81 90h6M119 90h6M81 91h6M119 91h6M81 92h6M119 92h6M81 93h6M119 93h6M75 94h6M125 94h6M75 95h6M125 95h6M75 96h6M125 96h6M75 97h6M125 97h6M75 98h6M125 98h6M75 99h6M125 99h6M75 100h6M125 100h6M75 101h6M125 101h6M75 102h6M125 102h6M75 103h6M125 103h6M75 104h6M125 104h6M75 105h6M125 105h6M69 106h6M131 106h6M69 107h6M131 107h6M69 108h6M131 108h6M69 109h6M131 109h6M69 110h6M131 110h6M69 111h6M131 111h6M69 112h6M131 112h6M69 113h6M131 113h6M69 114h6M131 114h6M69 115h6M131 115h6M69 116h6M131 116h6M69 117h6M131 117h6M69 118h6M131 118h6M62 119h7M137 119h7M62 120h7M137 120h7M62 121h7M137 121h7M62 122h7M137 122h7M62 123h7M137 123h7M62 124h7M137 124h7M62 125h7M137 125h7M62 126h7M137 126h7M62 127h7M137 127h7M62 128h7M137 128h7M62 129h7M137 129h7M62 130h7M137 130h7M62 131h7M137 131h7M62 132h7M137 132h7M62 133h7M137 133h7M62 134h7M137 134h7M62 135h7M137 135h7M62 136h7M137 136h7M62 137h7M137 137h7M62 138h7M137 138h7M62 139h7M137 139h7M62 140h7M137 140h7M62 141h7M137 141h7M62 142h7M137 142h7M62 143h7M137 143h7M69 144h6M131 144h6M69 145h6M131 145h6M69 146h6M131 146h6M69 147h6M131 147h6M69 148h6M131 148h6M69 149h6M131 149h6M69 150h6M131 150h6M69 151h6M131 151h6M69 152h6M131 152h6M69 153h6M131 153h6M69 154h6M131 154h6M69 155h6M131 155h6M75 156h12M119 156h12M75 157h12M119 157h12M75 158h12M119 158h12M75 159h12M119 159h12M75 160h12M119 160h12M75 161h12M119 161h12M87 162h32M87 163h32M87 164h32M87 165h32M87 166h32M87 167h32M87 168h32" />
    )
}
function egg() {
  return pathFrames.map((el, index) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 200 200" shapeRendering="crispEdges" key={'egg-' + index}>
        <path stroke="#000000" d="M0 169h200M0 170h200M0 171h200M0 172h200M0 173h200M0 174h200M12 175h7M156 175h6M12 176h7M156 176h6M12 177h7M156 177h6M12 178h7M156 178h6M12 179h7M156 179h6M12 180h7M156 180h6M44 181h6M181 181h6M44 182h6M181 182h6M44 183h6M181 183h6M44 184h6M181 184h6M44 185h6M181 185h6M44 186h6M181 186h6M87 187h7M137 187h7M150 187h6M187 187h7M87 188h7M137 188h7M150 188h6M187 188h7M87 189h7M137 189h7M150 189h6M187 189h7M87 190h7M137 190h7M150 190h6M187 190h7M87 191h7M137 191h7M150 191h6M187 191h7M87 192h7M137 192h7M150 192h6M187 192h7M87 193h7M137 193h7M150 193h6M187 193h7M6 194h6M106 194h6M175 194h6M6 195h6M106 195h6M175 195h6M6 196h6M106 196h6M175 196h6M6 197h6M106 197h6M175 197h6M6 198h6M106 198h6M175 198h6M6 199h6M106 199h6M175 199h6" />
        {egg0()}
      </svg>)
  })
}


export default egg