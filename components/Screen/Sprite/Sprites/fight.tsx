import { generateArrayFrame } from '@/utils/frontend/utilsFrontend'
import React from 'react'
import styles from '../sprite.module.css'

const pathFrames = generateArrayFrame(36)

const chocobo = (color: string) => {
  return (
    [[<path key='choco_sprite_1.svg'  stroke={color} d="M187 50h13M187 51h13M187 52h13M187 53h13M187 54h13M187 55h13M162 56h13M194 56h6M162 57h13M194 57h6M162 58h13M194 58h6M162 59h13M194 59h6M162 60h13M194 60h6M162 61h13M194 61h6M156 62h13M175 62h19M156 63h13M175 63h19M156 64h13M175 64h19M156 65h13M175 65h19M156 66h13M175 66h19M156 67h13M175 67h19M156 68h13M175 68h19M150 69h6M150 70h6M150 71h6M150 72h6M150 73h6M150 74h6M144 75h6M162 75h7M194 75h6M144 76h6M162 76h7M194 76h6M144 77h6M162 77h7M194 77h6M144 78h6M162 78h7M194 78h6M144 79h6M162 79h7M194 79h6M144 80h6M162 80h7M194 80h6M144 81h6M162 81h7M144 82h6M162 82h7M144 83h6M162 83h7M144 84h6M162 84h7M144 85h6M162 85h7M144 86h6M162 86h7M137 87h7M187 87h13M137 88h7M187 88h13M137 89h7M187 89h13M137 90h7M187 90h13M137 91h7M187 91h13M137 92h7M187 92h13M137 93h7M187 93h13M137 94h25M181 94h6M137 95h25M181 95h6M137 96h25M181 96h6M137 97h25M181 97h6M137 98h25M181 98h6M137 99h25M181 99h6M137 100h7M162 100h7M175 100h6M137 101h7M162 101h7M175 101h6M137 102h7M162 102h7M175 102h6M137 103h7M162 103h7M175 103h6M137 104h7M162 104h7M175 104h6M137 105h7M162 105h7M175 105h6M162 106h7M175 106h19M162 107h7M175 107h19M162 108h7M175 108h19M162 109h7M175 109h19M162 110h7M175 110h19M162 111h7M175 111h19M156 112h6M194 112h6M156 113h6M194 113h6M156 114h6M194 114h6M156 115h6M194 115h6M156 116h6M194 116h6M156 117h6M194 117h6M156 118h6M194 118h6M150 119h6M150 120h6M150 121h6M150 122h6M150 123h6M150 124h6M150 125h6M150 126h6M150 127h6M150 128h6M150 129h6M150 130h6M156 131h6M181 131h6M156 132h6M181 132h6M156 133h6M181 133h6M156 134h6M181 134h6M156 135h6M181 135h6M156 136h6M181 136h6M162 137h13M187 137h13M162 138h13M187 138h13M162 139h13M187 139h13M162 140h13M187 140h13M162 141h13M187 141h13M162 142h13M187 142h13M162 143h13M187 143h13M175 144h25M175 145h25M175 146h25M175 147h25M175 148h25M175 149h25M187 150h7M187 151h7M187 152h7M187 153h7M187 154h7M187 155h7M187 156h7M187 157h7M187 158h7M187 159h7M187 160h7M187 161h7M175 162h12M194 162h6M175 163h12M194 163h6M175 164h12M194 164h6M175 165h12M194 165h6M175 166h12M194 166h6M175 167h12M194 167h6M175 168h12M194 168h6" />,],[<path key='choco_sprite_2.svg'  stroke={color} d="M187 56h13M187 57h13M187 58h13M187 59h13M187 60h13M187 61h13M162 62h13M194 62h6M162 63h13M194 63h6M162 64h13M194 64h6M162 65h13M194 65h6M162 66h13M194 66h6M162 67h13M194 67h6M162 68h13M194 68h6M156 69h13M175 69h19M156 70h13M175 70h19M156 71h13M175 71h19M156 72h13M175 72h19M156 73h13M175 73h19M156 74h13M175 74h19M150 75h6M150 76h6M150 77h6M150 78h6M150 79h6M150 80h6M144 81h6M162 81h7M194 81h6M144 82h6M162 82h7M194 82h6M144 83h6M162 83h7M194 83h6M144 84h6M162 84h7M194 84h6M144 85h6M162 85h7M194 85h6M144 86h6M162 86h7M194 86h6M144 87h6M162 87h7M144 88h6M162 88h7M144 89h6M162 89h7M144 90h6M162 90h7M144 91h6M162 91h7M144 92h6M162 92h7M144 93h6M162 93h7M137 94h7M187 94h13M137 95h7M187 95h13M137 96h7M187 96h13M137 97h7M187 97h13M137 98h7M187 98h13M137 99h7M187 99h13M137 100h25M181 100h6M137 101h25M181 101h6M137 102h25M181 102h6M137 103h25M181 103h6M137 104h25M181 104h6M137 105h25M181 105h6M137 106h7M162 106h7M175 106h6M137 107h7M162 107h7M175 107h6M137 108h7M162 108h7M175 108h6M137 109h7M162 109h7M175 109h6M137 110h7M162 110h7M175 110h6M137 111h7M162 111h7M175 111h6M162 112h7M175 112h19M162 113h7M175 113h19M162 114h7M175 114h19M162 115h7M175 115h19M162 116h7M175 116h19M162 117h7M175 117h19M162 118h7M175 118h19M156 119h6M194 119h6M156 120h6M194 120h6M156 121h6M194 121h6M156 122h6M194 122h6M156 123h6M194 123h6M156 124h6M194 124h6M150 125h6M150 126h6M150 127h6M150 128h6M150 129h6M150 130h6M150 131h6M150 132h6M150 133h6M150 134h6M150 135h6M150 136h6M156 137h6M181 137h6M156 138h6M181 138h6M156 139h6M181 139h6M156 140h6M181 140h6M156 141h6M181 141h6M156 142h6M181 142h6M156 143h6M181 143h6M162 144h13M187 144h13M162 145h13M187 145h13M162 146h13M187 146h13M162 147h13M187 147h13M162 148h13M187 148h13M162 149h13M187 149h13M175 150h25M175 151h25M175 152h25M175 153h25M175 154h25M175 155h25M187 156h7M187 157h7M187 158h7M187 159h7M187 160h7M187 161h7M175 162h12M194 162h6M175 163h12M194 163h6M175 164h12M194 164h6M175 165h12M194 165h6M175 166h12M194 166h6M175 167h12M194 167h6M175 168h12M194 168h6" />,],[<path key='choco_sprite_3.svg'  stroke={color} d="M194 50h6M194 51h6M194 52h6M194 53h6M194 54h6M194 55h6M169 56h12M169 57h12M169 58h12M169 59h12M169 60h12M169 61h12M162 62h13M181 62h19M162 63h13M181 63h19M162 64h13M181 64h19M162 65h13M181 65h19M162 66h13M181 66h19M162 67h13M181 67h19M162 68h13M181 68h19M156 69h6M156 70h6M156 71h6M156 72h6M156 73h6M156 74h6M150 75h6M169 75h6M150 76h6M169 76h6M150 77h6M169 77h6M150 78h6M169 78h6M150 79h6M169 79h6M150 80h6M169 80h6M150 81h6M169 81h6M150 82h6M169 82h6M150 83h6M169 83h6M150 84h6M169 84h6M150 85h6M169 85h6M150 86h6M169 86h6M144 87h6M194 87h6M144 88h6M194 88h6M144 89h6M194 89h6M144 90h6M194 90h6M144 91h6M194 91h6M144 92h6M194 92h6M144 93h6M194 93h6M144 94h25M187 94h7M144 95h25M187 95h7M144 96h25M187 96h7M144 97h25M187 97h7M144 98h25M187 98h7M144 99h25M187 99h7M144 100h6M169 100h6M181 100h6M144 101h6M169 101h6M181 101h6M144 102h6M169 102h6M181 102h6M144 103h6M169 103h6M181 103h6M144 104h6M169 104h6M181 104h6M144 105h6M169 105h6M181 105h6M169 106h6M181 106h19M169 107h6M181 107h19M169 108h6M181 108h19M169 109h6M181 109h19M169 110h6M181 110h19M169 111h6M181 111h19M162 112h7M162 113h7M162 114h7M162 115h7M162 116h7M162 117h7M162 118h7M156 119h6M156 120h6M156 121h6M156 122h6M156 123h6M156 124h6M156 125h6M156 126h6M156 127h6M156 128h6M156 129h6M156 130h6M162 131h7M187 131h7M162 132h7M187 132h7M162 133h7M187 133h7M162 134h7M187 134h7M162 135h7M187 135h7M162 136h7M187 136h7M169 137h12M194 137h6M169 138h12M194 138h6M169 139h12M194 139h6M169 140h12M194 140h6M169 141h12M194 141h6M169 142h12M194 142h6M169 143h12M194 143h6M181 144h19M181 145h19M181 146h19M181 147h19M181 148h19M181 149h19M194 150h6M194 151h6M194 152h6M194 153h6M194 154h6M194 155h6M194 156h6M194 157h6M194 158h6M194 159h6M194 160h6M194 161h6M181 162h13M181 163h13M181 164h13M181 165h13M181 166h13M181 167h13M181 168h13" />,],[<path key='choco_sprite_4.svg'  stroke={color} d="M156 50h13M156 51h13M156 52h13M156 53h13M156 54h13M156 55h13M131 56h13M162 56h13M131 57h13M162 57h13M131 58h13M162 58h13M131 59h13M162 59h13M131 60h13M162 60h13M131 61h13M162 61h13M125 62h12M144 62h18M169 62h6M125 63h12M144 63h18M169 63h6M125 64h12M144 64h18M169 64h6M125 65h12M144 65h18M169 65h6M125 66h12M144 66h18M169 66h6M125 67h12M144 67h18M169 67h6M125 68h12M144 68h18M169 68h6M119 69h6M169 69h6M119 70h6M169 70h6M119 71h6M169 71h6M119 72h6M169 72h6M119 73h6M169 73h6M119 74h6M169 74h6M112 75h7M131 75h6M162 75h7M112 76h7M131 76h6M162 76h7M112 77h7M131 77h6M162 77h7M112 78h7M131 78h6M162 78h7M112 79h7M131 79h6M162 79h7M112 80h7M131 80h6M162 80h7M112 81h7M131 81h6M169 81h6M112 82h7M131 82h6M169 82h6M112 83h7M131 83h6M169 83h6M112 84h7M131 84h6M169 84h6M112 85h7M131 85h6M169 85h6M112 86h7M131 86h6M169 86h6M106 87h6M156 87h13M106 88h6M156 88h13M106 89h6M156 89h13M106 90h6M156 90h13M106 91h6M156 91h13M106 92h6M156 92h13M106 93h6M156 93h13M106 94h25M150 94h6M181 94h6M106 95h25M150 95h6M181 95h6M106 96h25M150 96h6M181 96h6M106 97h25M150 97h6M181 97h6M106 98h25M150 98h6M181 98h6M106 99h25M150 99h6M181 99h6M106 100h6M131 100h6M144 100h6M181 100h13M106 101h6M131 101h6M144 101h6M181 101h13M106 102h6M131 102h6M144 102h6M181 102h13M106 103h6M131 103h6M144 103h6M181 103h13M106 104h6M131 104h6M144 104h6M181 104h13M106 105h6M131 105h6M144 105h6M181 105h13M131 106h6M144 106h18M175 106h6M187 106h7M131 107h6M144 107h18M175 107h6M187 107h7M131 108h6M144 108h18M175 108h6M187 108h7M131 109h6M144 109h18M175 109h6M187 109h7M131 110h6M144 110h18M175 110h6M187 110h7M131 111h6M144 111h18M175 111h6M187 111h7M125 112h6M162 112h13M181 112h6M125 113h6M162 113h13M181 113h6M125 114h6M162 114h13M181 114h6M125 115h6M162 115h13M181 115h6M125 116h6M162 116h13M181 116h6M125 117h6M162 117h13M181 117h6M125 118h6M162 118h13M181 118h6M119 119h6M175 119h19M119 120h6M175 120h19M119 121h6M175 121h19M119 122h6M175 122h19M119 123h6M175 123h19M119 124h6M175 124h19M119 125h6M181 125h6M119 126h6M181 126h6M119 127h6M181 127h6M119 128h6M181 128h6M119 129h6M181 129h6M119 130h6M181 130h6M125 131h6M150 131h6M175 131h6M125 132h6M150 132h6M175 132h6M125 133h6M150 133h6M175 133h6M125 134h6M150 134h6M175 134h6M125 135h6M150 135h6M175 135h6M125 136h6M150 136h6M175 136h6M131 137h13M156 137h19M131 138h13M156 138h19M131 139h13M156 139h19M131 140h13M156 140h19M131 141h13M156 141h19M131 142h13M156 142h19M131 143h13M156 143h19M144 144h25M144 145h25M144 146h25M144 147h25M144 148h25M144 149h25M156 150h6M156 151h6M156 152h6M156 153h6M156 154h6M156 155h6M156 156h6M156 157h6M156 158h6M156 159h6M156 160h6M156 161h6M144 162h12M162 162h7M144 163h12M162 163h7M144 164h12M162 164h7M144 165h12M162 165h7M144 166h12M162 166h7M144 167h12M162 167h7M144 168h12M162 168h7" />,],[<path key='choco_sprite_5.svg'  stroke={color} d="M125 50h12M125 51h12M125 52h12M125 53h12M125 54h12M125 55h12M100 56h12M131 56h13M100 57h12M131 57h13M100 58h12M131 58h13M100 59h12M131 59h13M100 60h12M131 60h13M100 61h12M131 61h13M94 62h12M112 62h19M137 62h7M94 63h12M112 63h19M137 63h7M94 64h12M112 64h19M137 64h7M94 65h12M112 65h19M137 65h7M94 66h12M112 66h19M137 66h7M94 67h12M112 67h19M137 67h7M94 68h12M112 68h19M137 68h7M87 69h7M137 69h7M87 70h7M137 70h7M87 71h7M137 71h7M87 72h7M137 72h7M87 73h7M137 73h7M87 74h7M137 74h7M81 75h6M100 75h6M131 75h6M81 76h6M100 76h6M131 76h6M81 77h6M100 77h6M131 77h6M81 78h6M100 78h6M131 78h6M81 79h6M100 79h6M131 79h6M81 80h6M100 80h6M131 80h6M81 81h6M100 81h6M137 81h7M81 82h6M100 82h6M137 82h7M81 83h6M100 83h6M137 83h7M81 84h6M100 84h6M137 84h7M81 85h6M100 85h6M137 85h7M81 86h6M100 86h6M137 86h7M75 87h6M125 87h12M75 88h6M125 88h12M75 89h6M125 89h12M75 90h6M125 90h12M75 91h6M125 91h12M75 92h6M125 92h12M75 93h6M125 93h12M75 94h25M119 94h6M150 94h6M75 95h25M119 95h6M150 95h6M75 96h25M119 96h6M150 96h6M75 97h25M119 97h6M150 97h6M75 98h25M119 98h6M150 98h6M75 99h25M119 99h6M150 99h6M75 100h6M100 100h6M112 100h7M150 100h12M75 101h6M100 101h6M112 101h7M150 101h12M75 102h6M100 102h6M112 102h7M150 102h12M75 103h6M100 103h6M112 103h7M150 103h12M75 104h6M100 104h6M112 104h7M150 104h12M75 105h6M100 105h6M112 105h7M150 105h12M100 106h6M112 106h19M144 106h6M156 106h6M100 107h6M112 107h19M144 107h6M156 107h6M100 108h6M112 108h19M144 108h6M156 108h6M100 109h6M112 109h19M144 109h6M156 109h6M100 110h6M112 110h19M144 110h6M156 110h6M100 111h6M112 111h19M144 111h6M156 111h6M94 112h6M131 112h13M150 112h6M94 113h6M131 113h13M150 113h6M94 114h6M131 114h13M150 114h6M94 115h6M131 115h13M150 115h6M94 116h6M131 116h13M150 116h6M94 117h6M131 117h13M150 117h6M94 118h6M131 118h13M150 118h6M87 119h7M144 119h18M87 120h7M144 120h18M87 121h7M144 121h18M87 122h7M144 122h18M87 123h7M144 123h18M87 124h7M144 124h18M87 125h7M150 125h6M87 126h7M150 126h6M87 127h7M150 127h6M87 128h7M150 128h6M87 129h7M150 129h6M87 130h7M150 130h6M94 131h6M119 131h6M144 131h6M94 132h6M119 132h6M144 132h6M94 133h6M119 133h6M144 133h6M94 134h6M119 134h6M144 134h6M94 135h6M119 135h6M144 135h6M94 136h6M119 136h6M144 136h6M100 137h12M125 137h19M100 138h12M125 138h19M100 139h12M125 139h19M100 140h12M125 140h19M100 141h12M125 141h19M100 142h12M125 142h19M100 143h12M125 143h19M112 144h25M112 145h25M112 146h25M112 147h25M112 148h25M112 149h25M125 150h6M125 151h6M125 152h6M125 153h6M125 154h6M125 155h6M125 156h6M125 157h6M125 158h6M125 159h6M125 160h6M125 161h6M112 162h13M131 162h6M112 163h13M131 163h6M112 164h13M131 164h6M112 165h13M131 165h6M112 166h13M131 166h6M112 167h13M131 167h6M112 168h13M131 168h6" />,],[<path key='choco_sprite_6.svg'  stroke={color} d="M131 50h13M131 51h13M131 52h13M131 53h13M131 54h13M131 55h13M106 56h13M137 56h13M106 57h13M137 57h13M106 58h13M137 58h13M106 59h13M137 59h13M106 60h13M137 60h13M106 61h13M137 61h13M100 62h12M119 62h18M144 62h6M100 63h12M119 63h18M144 63h6M100 64h12M119 64h18M144 64h6M100 65h12M119 65h18M144 65h6M100 66h12M119 66h18M144 66h6M100 67h12M119 67h18M144 67h6M100 68h12M119 68h18M144 68h6M94 69h6M144 69h6M94 70h6M144 70h6M94 71h6M144 71h6M94 72h6M144 72h6M94 73h6M144 73h6M94 74h6M144 74h6M87 75h7M106 75h6M137 75h7M87 76h7M106 76h6M137 76h7M87 77h7M106 77h6M137 77h7M87 78h7M106 78h6M137 78h7M87 79h7M106 79h6M137 79h7M87 80h7M106 80h6M137 80h7M87 81h7M106 81h6M144 81h6M87 82h7M106 82h6M144 82h6M87 83h7M106 83h6M144 83h6M87 84h7M106 84h6M144 84h6M87 85h7M106 85h6M144 85h6M87 86h7M106 86h6M144 86h6M81 87h6M131 87h13M81 88h6M131 88h13M81 89h6M131 89h13M81 90h6M131 90h13M81 91h6M131 91h13M81 92h6M131 92h13M81 93h6M131 93h13M81 94h25M125 94h6M156 94h6M81 95h25M125 95h6M156 95h6M81 96h25M125 96h6M156 96h6M81 97h25M125 97h6M156 97h6M81 98h25M125 98h6M156 98h6M81 99h25M125 99h6M156 99h6M81 100h6M106 100h6M119 100h6M156 100h13M81 101h6M106 101h6M119 101h6M156 101h13M81 102h6M106 102h6M119 102h6M156 102h13M81 103h6M106 103h6M119 103h6M156 103h13M81 104h6M106 104h6M119 104h6M156 104h13M81 105h6M106 105h6M119 105h6M156 105h13M106 106h6M119 106h18M150 106h6M162 106h7M106 107h6M119 107h18M150 107h6M162 107h7M106 108h6M119 108h18M150 108h6M162 108h7M106 109h6M119 109h18M150 109h6M162 109h7M106 110h6M119 110h18M150 110h6M162 110h7M106 111h6M119 111h18M150 111h6M162 111h7M100 112h6M137 112h13M156 112h6M100 113h6M137 113h13M156 113h6M100 114h6M137 114h13M156 114h6M100 115h6M137 115h13M156 115h6M100 116h6M137 116h13M156 116h6M100 117h6M137 117h13M156 117h6M100 118h6M137 118h13M156 118h6M94 119h6M150 119h19M94 120h6M150 120h19M94 121h6M150 121h19M94 122h6M150 122h19M94 123h6M150 123h19M94 124h6M150 124h19M94 125h6M156 125h6M94 126h6M156 126h6M94 127h6M156 127h6M94 128h6M156 128h6M94 129h6M156 129h6M94 130h6M156 130h6M100 131h6M125 131h6M150 131h6M100 132h6M125 132h6M150 132h6M100 133h6M125 133h6M150 133h6M100 134h6M125 134h6M150 134h6M100 135h6M125 135h6M150 135h6M100 136h6M125 136h6M150 136h6M106 137h13M131 137h19M106 138h13M131 138h19M106 139h13M131 139h19M106 140h13M131 140h19M106 141h13M131 141h19M106 142h13M131 142h19M106 143h13M131 143h19M119 144h25M119 145h25M119 146h25M119 147h25M119 148h25M119 149h25M131 150h6M131 151h6M131 152h6M131 153h6M131 154h6M131 155h6M131 156h6M131 157h6M131 158h6M131 159h6M131 160h6M131 161h6M119 162h12M137 162h7M119 163h12M137 163h7M119 164h12M137 164h7M119 165h12M137 165h7M119 166h12M137 166h7M119 167h12M137 167h7M119 168h12M137 168h7" />,],]
  )
}

const enemy = (color: string) => {
    return (
      [[<path key='enemy_sprite_1.svg'  stroke={color} d="M56 31h6M56 32h6M56 33h6M56 34h6M56 35h6M56 36h6M44 37h6M56 37h13M75 37h6M44 38h6M56 38h13M75 38h6M44 39h6M56 39h13M75 39h6M44 40h6M56 40h13M75 40h6M44 41h6M56 41h13M75 41h6M44 42h6M56 42h13M75 42h6M44 43h6M56 43h13M75 43h6M12 44h19M44 44h12M62 44h25M12 45h19M44 45h12M62 45h25M12 46h19M44 46h12M62 46h25M12 47h19M44 47h12M62 47h25M12 48h19M44 48h12M62 48h25M12 49h19M44 49h12M62 49h25M6 50h31M50 50h12M69 50h6M81 50h6M6 51h31M50 51h12M69 51h6M81 51h6M6 52h31M50 52h12M69 52h6M81 52h6M6 53h31M50 53h12M69 53h6M81 53h6M6 54h31M50 54h12M69 54h6M81 54h6M6 55h31M50 55h12M69 55h6M81 55h6M0 56h44M56 56h6M69 56h6M81 56h6M0 57h44M56 57h6M69 57h6M81 57h6M0 58h44M56 58h6M69 58h6M81 58h6M0 59h44M56 59h6M69 59h6M81 59h6M0 60h44M56 60h6M69 60h6M81 60h6M0 61h44M56 61h6M69 61h6M81 61h6M0 62h6M12 62h19M37 62h7M56 62h31M0 63h6M12 63h19M37 63h7M56 63h31M0 64h6M12 64h19M37 64h7M56 64h31M0 65h6M12 65h19M37 65h7M56 65h31M0 66h6M12 66h19M37 66h7M56 66h31M0 67h6M12 67h19M37 67h7M56 67h31M0 68h6M12 68h19M37 68h7M56 68h31M0 69h44M56 69h25M0 70h44M56 70h25M0 71h44M56 71h25M0 72h44M56 72h25M0 73h44M56 73h25M0 74h44M56 74h25M0 75h6M12 75h19M37 75h7M56 75h25M0 76h6M12 76h19M37 76h7M56 76h25M0 77h6M12 77h19M37 77h7M56 77h25M0 78h6M12 78h19M37 78h7M56 78h25M0 79h6M12 79h19M37 79h7M56 79h25M0 80h6M12 80h19M37 80h7M56 80h25M0 81h6M37 81h7M62 81h13M0 82h6M37 82h7M62 82h13M0 83h6M37 83h7M62 83h13M0 84h6M37 84h7M62 84h13M0 85h6M37 85h7M62 85h13M0 86h6M37 86h7M62 86h13M6 87h6M31 87h6M62 87h13M6 88h6M31 88h6M62 88h13M6 89h6M31 89h6M62 89h13M6 90h6M31 90h6M62 90h13M6 91h6M31 91h6M62 91h13M6 92h6M31 92h6M62 92h13M6 93h6M31 93h6M62 93h13M12 94h19M62 94h13M12 95h19M62 95h13M12 96h19M62 96h13M12 97h19M62 97h13M12 98h19M62 98h13M12 99h19M62 99h13M19 100h6M37 100h19M62 100h19M19 101h6M37 101h19M62 101h19M19 102h6M37 102h19M62 102h19M19 103h6M37 103h19M62 103h19M19 104h6M37 104h19M62 104h19M19 105h6M37 105h19M62 105h19M0 106h81M0 107h81M0 108h81M0 109h81M0 110h81M0 111h81M0 112h81M0 113h81M0 114h81M0 115h81M0 116h81M0 117h81M0 118h81M0 119h44M62 119h13M0 120h44M62 120h13M0 121h44M62 121h13M0 122h44M62 122h13M0 123h44M62 123h13M0 124h44M62 124h13M0 125h37M0 126h37M0 127h37M0 128h37M0 129h37M0 130h37M0 131h44M0 132h44M0 133h44M0 134h44M0 135h44M0 136h44M6 137h31M6 138h31M6 139h31M6 140h31M6 141h31M6 142h31M6 143h31M0 144h44M0 145h44M0 146h44M0 147h44M0 148h44M0 149h44M6 150h31M6 151h31M6 152h31M6 153h31M6 154h31M6 155h31M6 156h31M6 157h31M6 158h31M6 159h31M6 160h31M6 161h31M0 162h31M0 163h31M0 164h31M0 165h31M0 166h31M0 167h31M0 168h31" />,],[<path key='enemy_sprite_2.svg'  stroke={color}  d="M56 37h6M56 38h6M56 39h6M56 40h6M56 41h6M56 42h6M56 43h6M12 44h19M44 44h6M56 44h13M75 44h6M12 45h19M44 45h6M56 45h13M75 45h6M12 46h19M44 46h6M56 46h13M75 46h6M12 47h19M44 47h6M56 47h13M75 47h6M12 48h19M44 48h6M56 48h13M75 48h6M12 49h19M44 49h6M56 49h13M75 49h6M6 50h31M44 50h12M62 50h25M6 51h31M44 51h12M62 51h25M6 52h31M44 52h12M62 52h25M6 53h31M44 53h12M62 53h25M6 54h31M44 54h12M62 54h25M6 55h31M44 55h12M62 55h25M0 56h44M50 56h12M69 56h6M81 56h6M0 57h44M50 57h12M69 57h6M81 57h6M0 58h44M50 58h12M69 58h6M81 58h6M0 59h44M50 59h12M69 59h6M81 59h6M0 60h44M50 60h12M69 60h6M81 60h6M0 61h44M50 61h12M69 61h6M81 61h6M0 62h6M12 62h19M37 62h7M56 62h6M69 62h6M81 62h6M0 63h6M12 63h19M37 63h7M56 63h6M69 63h6M81 63h6M0 64h6M12 64h19M37 64h7M56 64h6M69 64h6M81 64h6M0 65h6M12 65h19M37 65h7M56 65h6M69 65h6M81 65h6M0 66h6M12 66h19M37 66h7M56 66h6M69 66h6M81 66h6M0 67h6M12 67h19M37 67h7M56 67h6M69 67h6M81 67h6M0 68h6M12 68h19M37 68h7M56 68h6M69 68h6M81 68h6M0 69h44M56 69h31M0 70h44M56 70h31M0 71h44M56 71h31M0 72h44M56 72h31M0 73h44M56 73h31M0 74h44M56 74h31M0 75h6M12 75h19M37 75h7M56 75h25M0 76h6M12 76h19M37 76h7M56 76h25M0 77h6M12 77h19M37 77h7M56 77h25M0 78h6M12 78h19M37 78h7M56 78h25M0 79h6M12 79h19M37 79h7M56 79h25M0 80h6M12 80h19M37 80h7M56 80h25M0 81h6M37 81h7M56 81h25M0 82h6M37 82h7M56 82h25M0 83h6M37 83h7M56 83h25M0 84h6M37 84h7M56 84h25M0 85h6M37 85h7M56 85h25M0 86h6M37 86h7M56 86h25M6 87h6M31 87h6M62 87h13M6 88h6M31 88h6M62 88h13M6 89h6M31 89h6M62 89h13M6 90h6M31 90h6M62 90h13M6 91h6M31 91h6M62 91h13M6 92h6M31 92h6M62 92h13M6 93h6M31 93h6M62 93h13M12 94h19M62 94h13M12 95h19M62 95h13M12 96h19M62 96h13M12 97h19M62 97h13M12 98h19M62 98h13M12 99h19M62 99h13M19 100h6M62 100h13M19 101h6M62 101h13M19 102h6M62 102h13M19 103h6M62 103h13M19 104h6M62 104h13M19 105h6M62 105h13M0 106h56M62 106h19M0 107h56M62 107h19M0 108h56M62 108h19M0 109h56M62 109h19M0 110h56M62 110h19M0 111h56M62 111h19M0 112h81M0 113h81M0 114h81M0 115h81M0 116h81M0 117h81M0 118h81M0 119h81M0 120h81M0 121h81M0 122h81M0 123h81M0 124h81M6 125h31M62 125h13M6 126h31M62 126h13M6 127h31M62 127h13M6 128h31M62 128h13M6 129h31M62 129h13M6 130h31M62 130h13M0 131h44M0 132h44M0 133h44M0 134h44M0 135h44M0 136h44M6 137h31M6 138h31M6 139h31M6 140h31M6 141h31M6 142h31M6 143h31M0 144h44M0 145h44M0 146h44M0 147h44M0 148h44M0 149h44M6 150h31M6 151h31M6 152h31M6 153h31M6 154h31M6 155h31M6 156h31M6 157h31M6 158h31M6 159h31M6 160h31M6 161h31M0 162h31M0 163h31M0 164h31M0 165h31M0 166h31M0 167h31M0 168h31" />,],[<path key='enemy_sprite_3.svg'  stroke={color}  d="M12 44h19M56 44h6M12 45h19M56 45h6M12 46h19M56 46h6M12 47h19M56 47h6M12 48h19M56 48h6M12 49h19M56 49h6M6 50h31M44 50h6M56 50h13M75 50h6M6 51h31M44 51h6M56 51h13M75 51h6M6 52h31M44 52h6M56 52h13M75 52h6M6 53h31M44 53h6M56 53h13M75 53h6M6 54h31M44 54h6M56 54h13M75 54h6M6 55h31M44 55h6M56 55h13M75 55h6M0 56h56M62 56h25M0 57h56M62 57h25M0 58h56M62 58h25M0 59h56M62 59h25M0 60h56M62 60h25M0 61h56M62 61h25M0 62h6M12 62h19M37 62h7M50 62h12M69 62h6M81 62h6M0 63h6M12 63h19M37 63h7M50 63h12M69 63h6M81 63h6M0 64h6M12 64h19M37 64h7M50 64h12M69 64h6M81 64h6M0 65h6M12 65h19M37 65h7M50 65h12M69 65h6M81 65h6M0 66h6M12 66h19M37 66h7M50 66h12M69 66h6M81 66h6M0 67h6M12 67h19M37 67h7M50 67h12M69 67h6M81 67h6M0 68h6M12 68h19M37 68h7M50 68h12M69 68h6M81 68h6M0 69h44M56 69h6M69 69h6M81 69h6M0 70h44M56 70h6M69 70h6M81 70h6M0 71h44M56 71h6M69 71h6M81 71h6M0 72h44M56 72h6M69 72h6M81 72h6M0 73h44M56 73h6M69 73h6M81 73h6M0 74h44M56 74h6M69 74h6M81 74h6M0 75h6M12 75h19M37 75h7M56 75h31M0 76h6M12 76h19M37 76h7M56 76h31M0 77h6M12 77h19M37 77h7M56 77h31M0 78h6M12 78h19M37 78h7M56 78h31M0 79h6M12 79h19M37 79h7M56 79h31M0 80h6M12 80h19M37 80h7M56 80h31M0 81h6M37 81h7M56 81h25M0 82h6M37 82h7M56 82h25M0 83h6M37 83h7M56 83h25M0 84h6M37 84h7M56 84h25M0 85h6M37 85h7M56 85h25M0 86h6M37 86h7M56 86h25M6 87h6M31 87h6M56 87h25M6 88h6M31 88h6M56 88h25M6 89h6M31 89h6M56 89h25M6 90h6M31 90h6M56 90h25M6 91h6M31 91h6M56 91h25M6 92h6M31 92h6M56 92h25M6 93h6M31 93h6M56 93h25M12 94h19M62 94h13M12 95h19M62 95h13M12 96h19M62 96h13M12 97h19M62 97h13M12 98h19M62 98h13M12 99h19M62 99h13M0 100h6M19 100h6M62 100h13M0 101h6M19 101h6M62 101h13M0 102h6M19 102h6M62 102h13M0 103h6M19 103h6M62 103h13M0 104h6M19 104h6M62 104h13M0 105h6M19 105h6M62 105h13M0 106h44M62 106h13M0 107h44M62 107h13M0 108h44M62 108h13M0 109h44M62 109h13M0 110h44M62 110h13M0 111h44M62 111h13M0 112h56M62 112h19M0 113h56M62 113h19M0 114h56M62 114h19M0 115h56M62 115h19M0 116h56M62 116h19M0 117h56M62 117h19M0 118h56M62 118h19M0 119h81M0 120h81M0 121h81M0 122h81M0 123h81M0 124h81M6 125h75M6 126h75M6 127h75M6 128h75M6 129h75M6 130h75M0 131h44M62 131h13M0 132h44M62 132h13M0 133h44M62 133h13M0 134h44M62 134h13M0 135h44M62 135h13M0 136h44M62 136h13M6 137h31M6 138h31M6 139h31M6 140h31M6 141h31M6 142h31M6 143h31M0 144h44M0 145h44M0 146h44M0 147h44M0 148h44M0 149h44M6 150h31M6 151h31M6 152h31M6 153h31M6 154h31M6 155h31M6 156h31M6 157h31M6 158h31M6 159h31M6 160h31M6 161h31M0 162h31M0 163h31M0 164h31M0 165h31M0 166h31M0 167h31M0 168h31" />,],[<path key='enemy_sprite_4.svg'  stroke={color}  d="M87 31h7M87 32h7M87 33h7M87 34h7M87 35h7M87 36h7M75 37h6M87 37h13M106 37h6M75 38h6M87 38h13M106 38h6M75 39h6M87 39h13M106 39h6M75 40h6M87 40h13M106 40h6M75 41h6M87 41h13M106 41h6M75 42h6M87 42h13M106 42h6M75 43h6M87 43h13M106 43h6M12 44h7M44 44h18M75 44h12M94 44h25M12 45h7M44 45h18M75 45h12M94 45h25M12 46h7M44 46h18M75 46h12M94 46h25M12 47h7M44 47h18M75 47h12M94 47h25M12 48h7M44 48h18M75 48h12M94 48h25M12 49h7M44 49h18M75 49h12M94 49h25M6 50h13M25 50h6M37 50h32M81 50h13M100 50h6M112 50h7M6 51h13M25 51h6M37 51h32M81 51h13M100 51h6M112 51h7M6 52h13M25 52h6M37 52h32M81 52h13M100 52h6M112 52h7M6 53h13M25 53h6M37 53h32M81 53h13M100 53h6M112 53h7M6 54h13M25 54h6M37 54h32M81 54h13M100 54h6M112 54h7M6 55h13M25 55h6M37 55h32M81 55h13M100 55h6M112 55h7M0 56h12M19 56h56M87 56h7M100 56h6M112 56h7M0 57h12M19 57h56M87 57h7M100 57h6M112 57h7M0 58h12M19 58h56M87 58h7M100 58h6M112 58h7M0 59h12M19 59h56M87 59h7M100 59h6M112 59h7M0 60h12M19 60h56M87 60h7M100 60h6M112 60h7M0 61h12M19 61h56M87 61h7M100 61h6M112 61h7M0 62h6M12 62h13M31 62h6M44 62h18M69 62h6M87 62h32M0 63h6M12 63h13M31 63h6M44 63h18M69 63h6M87 63h32M0 64h6M12 64h13M31 64h6M44 64h18M69 64h6M87 64h32M0 65h6M12 65h13M31 65h6M44 65h18M69 65h6M87 65h32M0 66h6M12 66h13M31 66h6M44 66h18M69 66h6M87 66h32M0 67h6M12 67h13M31 67h6M44 67h18M69 67h6M87 67h32M0 68h6M12 68h13M31 68h6M44 68h18M69 68h6M87 68h32M0 69h6M12 69h7M31 69h44M87 69h25M0 70h6M12 70h7M31 70h44M87 70h25M0 71h6M12 71h7M31 71h44M87 71h25M0 72h6M12 72h7M31 72h44M87 72h25M0 73h6M12 73h7M31 73h44M87 73h25M0 74h6M12 74h7M31 74h44M87 74h25M0 75h19M31 75h6M44 75h18M69 75h6M87 75h25M0 76h19M31 76h6M44 76h18M69 76h6M87 76h25M0 77h19M31 77h6M44 77h18M69 77h6M87 77h25M0 78h19M31 78h6M44 78h18M69 78h6M87 78h25M0 79h19M31 79h6M44 79h18M69 79h6M87 79h25M0 80h19M31 80h6M44 80h18M69 80h6M87 80h25M0 81h19M31 81h6M69 81h6M94 81h12M0 82h19M31 82h6M69 82h6M94 82h12M0 83h19M31 83h6M69 83h6M94 83h12M0 84h19M31 84h6M69 84h6M94 84h12M0 85h19M31 85h6M69 85h6M94 85h12M0 86h19M31 86h6M69 86h6M94 86h12M0 87h19M37 87h7M62 87h7M94 87h12M0 88h19M37 88h7M62 88h7M94 88h12M0 89h19M37 89h7M62 89h7M94 89h12M0 90h19M37 90h7M62 90h7M94 90h12M0 91h19M37 91h7M62 91h7M94 91h12M0 92h19M37 92h7M62 92h7M94 92h12M0 93h19M37 93h7M62 93h7M94 93h12M0 94h12M44 94h18M94 94h12M0 95h12M44 95h18M94 95h12M0 96h12M44 96h18M94 96h12M0 97h12M44 97h18M94 97h12M0 98h12M44 98h18M94 98h12M0 99h12M44 99h18M94 99h12M0 100h12M50 100h6M69 100h18M94 100h18M0 101h12M50 101h6M69 101h18M94 101h18M0 102h12M50 102h6M69 102h18M94 102h18M0 103h12M50 103h6M69 103h18M94 103h18M0 104h12M50 104h6M69 104h18M94 104h18M0 105h12M50 105h6M69 105h18M94 105h18M0 106h12M31 106h81M0 107h12M31 107h81M0 108h12M31 108h81M0 109h12M31 109h81M0 110h12M31 110h81M0 111h12M31 111h81M0 112h12M19 112h93M0 113h12M19 113h93M0 114h12M19 114h93M0 115h12M19 115h93M0 116h12M19 116h93M0 117h12M19 117h93M0 118h12M19 118h93M0 119h75M94 119h12M0 120h75M94 120h12M0 121h75M94 121h12M0 122h75M94 122h12M0 123h75M94 123h12M0 124h75M94 124h12M0 125h69M0 126h69M0 127h69M0 128h69M0 129h69M0 130h69M0 131h12M31 131h44M0 132h12M31 132h44M0 133h12M31 133h44M0 134h12M31 134h44M0 135h12M31 135h44M0 136h12M31 136h44M37 137h32M37 138h32M37 139h32M37 140h32M37 141h32M37 142h32M37 143h32M6 144h19M31 144h44M6 145h19M31 145h44M6 146h19M31 146h44M6 147h19M31 147h44M6 148h19M31 148h44M6 149h19M31 149h44M0 150h6M12 150h19M37 150h32M0 151h6M12 151h19M37 151h32M0 152h6M12 152h19M37 152h32M0 153h6M12 153h19M37 153h32M0 154h6M12 154h19M37 154h32M0 155h6M12 155h19M37 155h32M0 156h6M12 156h19M37 156h32M0 157h6M12 157h19M37 157h32M0 158h6M12 158h19M37 158h32M0 159h6M12 159h19M37 159h32M0 160h6M12 160h19M37 160h32M0 161h6M12 161h19M37 161h32M19 162h6M31 162h31M19 163h6M31 163h31M19 164h6M31 164h31M19 165h6M31 165h31M19 166h6M31 166h31M19 167h6M31 167h31M19 168h6M31 168h31" />,],[<path key='enemy_sprite_5.svg'  stroke={color}  d="M119 31h6M119 32h6M119 33h6M119 34h6M119 35h6M119 36h6M106 37h6M119 37h12M137 37h7M106 38h6M119 38h12M137 38h7M106 39h6M119 39h12M137 39h7M106 40h6M119 40h12M137 40h7M106 41h6M119 41h12M137 41h7M106 42h6M119 42h12M137 42h7M106 43h6M119 43h12M137 43h7M44 44h6M75 44h19M106 44h13M125 44h25M44 45h6M75 45h19M106 45h13M125 45h25M44 46h6M75 46h19M106 46h13M125 46h25M44 47h6M75 47h19M106 47h13M125 47h25M44 48h6M75 48h19M106 48h13M125 48h25M44 49h6M75 49h19M106 49h13M125 49h25M25 50h6M37 50h13M56 50h6M69 50h31M112 50h13M131 50h6M144 50h6M25 51h6M37 51h13M56 51h6M69 51h31M112 51h13M131 51h6M144 51h6M25 52h6M37 52h13M56 52h6M69 52h31M112 52h13M131 52h6M144 52h6M25 53h6M37 53h13M56 53h6M69 53h31M112 53h13M131 53h6M144 53h6M25 54h6M37 54h13M56 54h6M69 54h31M112 54h13M131 54h6M144 54h6M25 55h6M37 55h13M56 55h6M69 55h31M112 55h13M131 55h6M144 55h6M19 56h25M50 56h56M119 56h6M131 56h6M144 56h6M19 57h25M50 57h56M119 57h6M131 57h6M144 57h6M19 58h25M50 58h56M119 58h6M131 58h6M144 58h6M19 59h25M50 59h56M119 59h6M131 59h6M144 59h6M19 60h25M50 60h56M119 60h6M131 60h6M144 60h6M19 61h25M50 61h56M119 61h6M131 61h6M144 61h6M19 62h6M31 62h6M44 62h12M62 62h7M75 62h19M100 62h6M119 62h31M19 63h6M31 63h6M44 63h12M62 63h7M75 63h19M100 63h6M119 63h31M19 64h6M31 64h6M44 64h12M62 64h7M75 64h19M100 64h6M119 64h31M19 65h6M31 65h6M44 65h12M62 65h7M75 65h19M100 65h6M119 65h31M19 66h6M31 66h6M44 66h12M62 66h7M75 66h19M100 66h6M119 66h31M19 67h6M31 67h6M44 67h12M62 67h7M75 67h19M100 67h6M119 67h31M19 68h6M31 68h6M44 68h12M62 68h7M75 68h19M100 68h6M119 68h31M19 69h6M31 69h6M44 69h6M62 69h44M119 69h25M19 70h6M31 70h6M44 70h6M62 70h44M119 70h25M19 71h6M31 71h6M44 71h6M62 71h44M119 71h25M19 72h6M31 72h6M44 72h6M62 72h44M119 72h25M19 73h6M31 73h6M44 73h6M62 73h44M119 73h25M19 74h6M31 74h6M44 74h6M62 74h44M119 74h25M19 75h31M62 75h7M75 75h19M100 75h6M119 75h25M19 76h31M62 76h7M75 76h19M100 76h6M119 76h25M19 77h31M62 77h7M75 77h19M100 77h6M119 77h25M19 78h31M62 78h7M75 78h19M100 78h6M119 78h25M19 79h31M62 79h7M75 79h19M100 79h6M119 79h25M19 80h31M62 80h7M75 80h19M100 80h6M119 80h25M25 81h25M62 81h7M100 81h6M125 81h12M25 82h25M62 82h7M100 82h6M125 82h12M25 83h25M62 83h7M100 83h6M125 83h12M25 84h25M62 84h7M100 84h6M125 84h12M25 85h25M62 85h7M100 85h6M125 85h12M25 86h25M62 86h7M100 86h6M125 86h12M25 87h25M69 87h6M94 87h6M125 87h12M25 88h25M69 88h6M94 88h6M125 88h12M25 89h25M69 89h6M94 89h6M125 89h12M25 90h25M69 90h6M94 90h6M125 90h12M25 91h25M69 91h6M94 91h6M125 91h12M25 92h25M69 92h6M94 92h6M125 92h12M25 93h25M69 93h6M94 93h6M125 93h12M31 94h13M75 94h19M125 94h12M31 95h13M75 95h19M125 95h12M31 96h13M75 96h19M125 96h12M31 97h13M75 97h19M125 97h12M31 98h13M75 98h19M125 98h12M31 99h13M75 99h19M125 99h12M31 100h13M81 100h6M100 100h19M125 100h19M31 101h13M81 101h6M100 101h19M125 101h19M31 102h13M81 102h6M100 102h19M125 102h19M31 103h13M81 103h6M100 103h19M125 103h19M31 104h13M81 104h6M100 104h19M125 104h19M31 105h13M81 105h6M100 105h19M125 105h19M31 106h13M62 106h82M31 107h13M62 107h82M31 108h13M62 108h82M31 109h13M62 109h82M31 110h13M62 110h82M31 111h13M62 111h82M25 112h19M50 112h94M25 113h19M50 113h94M25 114h19M50 114h94M25 115h19M50 115h94M25 116h19M50 116h94M25 117h19M50 117h94M25 118h19M50 118h94M25 119h81M125 119h12M25 120h81M125 120h12M25 121h81M125 121h12M25 122h81M125 122h12M25 123h81M125 123h12M25 124h81M125 124h12M25 125h75M25 126h75M25 127h75M25 128h75M25 129h75M25 130h75M31 131h13M62 131h44M31 132h13M62 132h44M31 133h13M62 133h44M31 134h13M62 134h44M31 135h13M62 135h44M31 136h13M62 136h44M69 137h31M69 138h31M69 139h31M69 140h31M69 141h31M69 142h31M69 143h31M19 144h6M37 144h19M62 144h44M19 145h6M37 145h19M62 145h44M19 146h6M37 146h19M62 146h44M19 147h6M37 147h19M62 147h44M19 148h6M37 148h19M62 148h44M19 149h6M37 149h19M62 149h44M19 150h18M44 150h18M69 150h31M19 151h18M44 151h18M69 151h31M19 152h18M44 152h18M69 152h31M19 153h18M44 153h18M69 153h31M19 154h18M44 154h18M69 154h31M19 155h18M44 155h18M69 155h31M25 156h12M44 156h18M69 156h31M25 157h12M44 157h18M69 157h31M25 158h12M44 158h18M69 158h31M25 159h12M44 159h18M69 159h31M25 160h12M44 160h18M69 160h31M25 161h12M44 161h18M69 161h31M50 162h6M62 162h32M50 163h6M62 163h32M50 164h6M62 164h32M50 165h6M62 165h32M50 166h6M62 166h32M50 167h6M62 167h32M50 168h6M62 168h32" />,],[<path key='enemy_sprite_6.svg'  stroke={color}  d="M112 31h7M112 32h7M112 33h7M112 34h7M112 35h7M112 36h7M100 37h6M112 37h13M131 37h6M100 38h6M112 38h13M131 38h6M100 39h6M112 39h13M131 39h6M100 40h6M112 40h13M131 40h6M100 41h6M112 41h13M131 41h6M100 42h6M112 42h13M131 42h6M100 43h6M112 43h13M131 43h6M37 44h7M69 44h18M100 44h12M119 44h25M37 45h7M69 45h18M100 45h12M119 45h25M37 46h7M69 46h18M100 46h12M119 46h25M37 47h7M69 47h18M100 47h12M119 47h25M37 48h7M69 48h18M100 48h12M119 48h25M37 49h7M69 49h18M100 49h12M119 49h25M19 50h6M31 50h13M50 50h6M62 50h32M106 50h13M125 50h6M137 50h7M19 51h6M31 51h13M50 51h6M62 51h32M106 51h13M125 51h6M137 51h7M19 52h6M31 52h13M50 52h6M62 52h32M106 52h13M125 52h6M137 52h7M19 53h6M31 53h13M50 53h6M62 53h32M106 53h13M125 53h6M137 53h7M19 54h6M31 54h13M50 54h6M62 54h32M106 54h13M125 54h6M137 54h7M19 55h6M31 55h13M50 55h6M62 55h32M106 55h13M125 55h6M137 55h7M12 56h25M44 56h56M112 56h7M125 56h6M137 56h7M12 57h25M44 57h56M112 57h7M125 57h6M137 57h7M12 58h25M44 58h56M112 58h7M125 58h6M137 58h7M12 59h25M44 59h56M112 59h7M125 59h6M137 59h7M12 60h25M44 60h56M112 60h7M125 60h6M137 60h7M12 61h25M44 61h56M112 61h7M125 61h6M137 61h7M12 62h7M25 62h6M37 62h13M56 62h6M69 62h18M94 62h6M112 62h32M12 63h7M25 63h6M37 63h13M56 63h6M69 63h18M94 63h6M112 63h32M12 64h7M25 64h6M37 64h13M56 64h6M69 64h18M94 64h6M112 64h32M12 65h7M25 65h6M37 65h13M56 65h6M69 65h18M94 65h6M112 65h32M12 66h7M25 66h6M37 66h13M56 66h6M69 66h18M94 66h6M112 66h32M12 67h7M25 67h6M37 67h13M56 67h6M69 67h18M94 67h6M112 67h32M12 68h7M25 68h6M37 68h13M56 68h6M69 68h18M94 68h6M112 68h32M12 69h7M25 69h6M37 69h7M56 69h44M112 69h25M12 70h7M25 70h6M37 70h7M56 70h44M112 70h25M12 71h7M25 71h6M37 71h7M56 71h44M112 71h25M12 72h7M25 72h6M37 72h7M56 72h44M112 72h25M12 73h7M25 73h6M37 73h7M56 73h44M112 73h25M12 74h7M25 74h6M37 74h7M56 74h44M112 74h25M12 75h32M56 75h6M69 75h18M94 75h6M112 75h25M12 76h32M56 76h6M69 76h18M94 76h6M112 76h25M12 77h32M56 77h6M69 77h18M94 77h6M112 77h25M12 78h32M56 78h6M69 78h18M94 78h6M112 78h25M12 79h32M56 79h6M69 79h18M94 79h6M112 79h25M12 80h32M56 80h6M69 80h18M94 80h6M112 80h25M19 81h25M56 81h6M94 81h6M119 81h12M19 82h25M56 82h6M94 82h6M119 82h12M19 83h25M56 83h6M94 83h6M119 83h12M19 84h25M56 84h6M94 84h6M119 84h12M19 85h25M56 85h6M94 85h6M119 85h12M19 86h25M56 86h6M94 86h6M119 86h12M19 87h25M62 87h7M87 87h7M119 87h12M19 88h25M62 88h7M87 88h7M119 88h12M19 89h25M62 89h7M87 89h7M119 89h12M19 90h25M62 90h7M87 90h7M119 90h12M19 91h25M62 91h7M87 91h7M119 91h12M19 92h25M62 92h7M87 92h7M119 92h12M19 93h25M62 93h7M87 93h7M119 93h12M25 94h12M69 94h18M119 94h12M25 95h12M69 95h18M119 95h12M25 96h12M69 96h18M119 96h12M25 97h12M69 97h18M119 97h12M25 98h12M69 98h18M119 98h12M25 99h12M69 99h18M119 99h12M25 100h12M75 100h6M94 100h18M119 100h18M25 101h12M75 101h6M94 101h18M119 101h18M25 102h12M75 102h6M94 102h18M119 102h18M25 103h12M75 103h6M94 103h18M119 103h18M25 104h12M75 104h6M94 104h18M119 104h18M25 105h12M75 105h6M94 105h18M119 105h18M25 106h12M56 106h81M25 107h12M56 107h81M25 108h12M56 108h81M25 109h12M56 109h81M25 110h12M56 110h81M25 111h12M56 111h81M19 112h18M44 112h93M19 113h18M44 113h93M19 114h18M44 114h93M19 115h18M44 115h93M19 116h18M44 116h93M19 117h18M44 117h93M19 118h18M44 118h93M19 119h81M119 119h12M19 120h81M119 120h12M19 121h81M119 121h12M19 122h81M119 122h12M19 123h81M119 123h12M19 124h81M119 124h12M19 125h75M19 126h75M19 127h75M19 128h75M19 129h75M19 130h75M25 131h12M56 131h44M25 132h12M56 132h44M25 133h12M56 133h44M25 134h12M56 134h44M25 135h12M56 135h44M25 136h12M56 136h44M62 137h32M62 138h32M62 139h32M62 140h32M62 141h32M62 142h32M62 143h32M12 144h7M31 144h19M56 144h44M12 145h7M31 145h19M56 145h44M12 146h7M31 146h19M56 146h44M12 147h7M31 147h19M56 147h44M12 148h7M31 148h19M56 148h44M12 149h7M31 149h19M56 149h44M12 150h19M37 150h19M62 150h32M12 151h19M37 151h19M62 151h32M12 152h19M37 152h19M62 152h32M12 153h19M37 153h19M62 153h32M12 154h19M37 154h19M62 154h32M12 155h19M37 155h19M62 155h32M19 156h12M37 156h19M62 156h32M19 157h12M37 157h19M62 157h32M19 158h12M37 158h19M62 158h32M19 159h12M37 159h19M62 159h32M19 160h12M37 160h19M62 160h32M19 161h12M37 161h19M62 161h32M44 162h6M56 162h31M44 163h6M56 163h31M44 164h6M56 164h31M44 165h6M56 165h31M44 166h6M56 166h31M44 167h6M56 167h31M44 168h6M56 168h31" />,],[<path key='enemy_sprite_7.svg'  stroke={color}  d="M50 31h6M50 32h6M50 33h6M50 34h6M50 35h6M50 36h6M37 37h7M50 37h12M69 37h6M37 38h7M50 38h12M69 38h6M37 39h7M50 39h12M69 39h6M37 40h7M50 40h12M69 40h6M37 41h7M50 41h12M69 41h6M37 42h7M50 42h12M69 42h6M37 43h7M50 43h12M69 43h6M6 44h19M37 44h13M56 44h25M6 45h19M37 45h13M56 45h25M6 46h19M37 46h13M56 46h25M6 47h19M37 47h13M56 47h25M6 48h19M37 48h13M56 48h25M6 49h19M37 49h13M56 49h25M0 50h31M44 50h12M62 50h7M75 50h6M0 51h31M44 51h12M62 51h7M75 51h6M0 52h31M44 52h12M62 52h7M75 52h6M0 53h31M44 53h12M62 53h7M75 53h6M0 54h31M44 54h12M62 54h7M75 54h6M0 55h31M44 55h12M62 55h7M75 55h6M0 56h37M50 56h6M62 56h7M75 56h6M0 57h37M50 57h6M62 57h7M75 57h6M0 58h37M50 58h6M62 58h7M75 58h6M0 59h37M50 59h6M62 59h7M75 59h6M0 60h37M50 60h6M62 60h7M75 60h6M0 61h37M50 61h6M62 61h7M75 61h6M6 62h19M31 62h6M50 62h31M6 63h19M31 63h6M50 63h31M6 64h19M31 64h6M50 64h31M6 65h19M31 65h6M50 65h31M6 66h19M31 66h6M50 66h31M6 67h19M31 67h6M50 67h31M6 68h19M31 68h6M50 68h31M0 69h37M50 69h25M0 70h37M50 70h25M0 71h37M50 71h25M0 72h37M50 72h25M0 73h37M50 73h25M0 74h37M50 74h25M6 75h19M31 75h6M50 75h25M6 76h19M31 76h6M50 76h25M6 77h19M31 77h6M50 77h25M6 78h19M31 78h6M50 78h25M6 79h19M31 79h6M50 79h25M6 80h19M31 80h6M50 80h25M31 81h6M56 81h13M31 82h6M56 82h13M31 83h6M56 83h13M31 84h6M56 84h13M31 85h6M56 85h13M31 86h6M56 86h13M0 87h6M25 87h6M56 87h13M0 88h6M25 88h6M56 88h13M0 89h6M25 89h6M56 89h13M0 90h6M25 90h6M56 90h13M0 91h6M25 91h6M56 91h13M0 92h6M25 92h6M56 92h13M0 93h6M25 93h6M56 93h13M6 94h19M56 94h13M6 95h19M56 95h13M6 96h19M56 96h13M6 97h19M56 97h13M6 98h19M56 98h13M6 99h19M56 99h13M12 100h7M31 100h19M56 100h19M12 101h7M31 101h19M56 101h19M12 102h7M31 102h19M56 102h19M12 103h7M31 103h19M56 103h19M12 104h7M31 104h19M56 104h19M12 105h7M31 105h19M56 105h19M0 106h75M0 107h75M0 108h75M0 109h75M0 110h75M0 111h75M0 112h75M0 113h75M0 114h75M0 115h75M0 116h75M0 117h75M0 118h75M0 119h37M56 119h13M0 120h37M56 120h13M0 121h37M56 121h13M0 122h37M56 122h13M0 123h37M56 123h13M0 124h37M56 124h13M0 125h31M0 126h31M0 127h31M0 128h31M0 129h31M0 130h31M0 131h37M0 132h37M0 133h37M0 134h37M0 135h37M0 136h37M0 137h31M0 138h31M0 139h31M0 140h31M0 141h31M0 142h31M0 143h31M0 144h37M0 145h37M0 146h37M0 147h37M0 148h37M0 149h37M0 150h31M0 151h31M0 152h31M0 153h31M0 154h31M0 155h31M0 156h31M0 157h31M0 158h31M0 159h31M0 160h31M0 161h31M0 162h25M0 163h25M0 164h25M0 165h25M0 166h25M0 167h25M0 168h25" />,],]
    )
  }

function fight(color: string , color2: string) {
  return pathFrames.map((el, index) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 200 200" shapeRendering="crispEdges" key={'fight-' + index}>
        <path stroke="#000000" d="M0 169h200M0 170h200M0 171h200M0 172h200M0 173h200M0 174h200M12 175h7M156 175h6M12 176h7M156 176h6M12 177h7M156 177h6M12 178h7M156 178h6M12 179h7M156 179h6M12 180h7M156 180h6M44 181h6M181 181h6M44 182h6M181 182h6M44 183h6M181 183h6M44 184h6M181 184h6M44 185h6M181 185h6M44 186h6M181 186h6M87 187h7M137 187h7M150 187h6M187 187h7M87 188h7M137 188h7M150 188h6M187 188h7M87 189h7M137 189h7M150 189h6M187 189h7M87 190h7M137 190h7M150 190h6M187 190h7M87 191h7M137 191h7M150 191h6M187 191h7M87 192h7M137 192h7M150 192h6M187 192h7M87 193h7M137 193h7M150 193h6M187 193h7M6 194h6M106 194h6M175 194h6M6 195h6M106 195h6M175 195h6M6 196h6M106 196h6M175 196h6M6 197h6M106 197h6M175 197h6M6 198h6M106 198h6M175 198h6M6 199h6M106 199h6M175 199h6" />
        {
            selectFrames(index, [0,1,4,5,8,9,12,14,18,19,22,23,26,27,35]) ? chocobo(color)[0][0] :
            selectFrames(index, [2,3,6,7,10,11,20,21,24,25,28,29]) ? chocobo(color)[1][0] :
            selectFrames(index, [13,15,16,17]) ? chocobo(color)[2][0] :
            selectFrames(index, [30,34]) ? chocobo(color)[3][0] :
            selectFrames(index, [31,33]) ? chocobo(color)[4][0] :
            selectFrames(index, [32]) ? chocobo(color)[5][0] :
            null
        }
        {
            selectFrames(index,[0,4,8,17,18,22,26,30,32]) ? enemy(color2)[0][0]:
            selectFrames(index,[1,3,5,7,9,11,19,21,23,25,27,29]) ? enemy(color2)[1][0]:
            selectFrames(index,[2,6,10,20,24,28]) ? enemy(color2)[2][0]:
            selectFrames(index,[12,16]) ? enemy(color2)[3][0]:
            selectFrames(index,[13,15]) ? enemy(color2)[4][0]:
            selectFrames(index,[14]) ? enemy(color2)[5][0]:
            selectFrames(index,[31,33,34,35]) ? enemy(color2)[6][0]:
            null
        }
      </svg>)
  })
}

function selectFrames(n:number, list:number[]){
    return list.includes(n)
}


export default fight