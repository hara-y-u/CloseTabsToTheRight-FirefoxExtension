#!/bin/bash

package_name='CloseTabsToTheRight.xpi'
current_dir=`pwd`
package_dir='../packages'
source_dir='src'
exclude_path_rx='\(.*\.git.*\|.+\/tags\)'

if [ ! -d $package_dir ]; then
	mkdir $package_dir
fi

pushd $source_dir
echo "Making Package: $package_dir/$package_name .."
find . -regex "$exclude_path_rx" -prune -o -type f -print | zip $current_dir/$package_dir/$package_name -@
popd

