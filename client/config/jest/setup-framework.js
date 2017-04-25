import {matcher, serializer} from 'jest-glamor-react'

expect.extend(matcher)
expect.addSnapshotSerializer(serializer)
