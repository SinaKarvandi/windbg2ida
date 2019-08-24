# windbg2ida
Windbg2ida lets you dump each step in Windbg then shows these steps in IDA
Windbg2ida - Windbg and IDA plugin      


Shows every steps of Windbg in IDA :)
-------------------------------------

*   [Home](index.html)
*   [Download](https://github.com/SinaKarvandi/windbg2ida/archive/master.zip)
*   [Source Code](https://github.com/SinaKarvandi/windbg2ida)
*   [Blog](https://rayanfam.com)
*   [Ntdebug](https://ntdebug.com)

[Follow @Intel80x86](https://twitter.com/Intel80x86?ref_src=twsrc%5Etfw)


Introduction to Windbg2ida
==========================

 Windbg2ida lets you dump each step (instruction) in Windbg then give you a dump file and you can use it later in your IDA to put color on each line of the instructions that you've run to show code coverage.

![Windbg2ida](./style/windbg2ida.png)

You can use Windbg2ida to see differences between two or more code coverages in IDA.

How to use?
-----------

####     -   Load Script

  

      Download windbg2ida from [here](https://github.com/SinaKarvandi/windbg2ida/archive/master.zip) or use git to download files.

    git clone https://github.com/SinaKarvandi/windbg2ida.git

  

      Open Windbg and load windbg2ida.js script (replace path with your computer path to windbg2ida.js)

    	.load jsprovider.dll

    	.scriptload "C:\\Users\\Sina\\Desktop\\windbg2ida\\windbg2ida.js"

  

      Important note : If you can't load the script or the script gives you error about using files then make sure to update you windbg (Windows SDK) to the latest version as the previous versions have problem with using file with JavaScript.

  

####     -   Examples

  
*         The simplest example is execute until the return of current function. (replace the path to save the dump)
  

    	!windbg2ida\_run\_until\_ret "c:\\\\users\\\\sina\\\\desktop\\\\dump1.w2i"

  
*         If you wanna run a specific number of instructions (e.g 100 instruction). (replace the path to save the dump)
  

    	!windbg2ida\_run\_with\_limitation 100,"c:\\\\users\\\\sina\\\\desktop\\\\dump1.w2i"

  
*         If you want to execute until a specific address is executed. (replace the path to save the dump and the address(es))
  

    	!windbg2ida\_run\_until\_address "fffff80617bc4622,fffff80617bc4628,fffff80617bc462a"  
,"c:\\\\users\\\\sina\\\\desktop\\\\dump1.w2i"

  
*         If you want to execute until a specific address is executed or if windbg reaches to the return of current function. (replace the path to save the dump and the address(es))
  

    	!windbg2ida\_run\_until\_address\_or\_return "fffff80617bc4622","c:\\\\users\\\\sina\\\\desktop\\\\dump1.w2i"

  
  
  

####     -   Show Dump in IDA

  

Now in order to use your dump file(s), copy them into "w2i Files" folder next to IDAScript.py, goto IDA > File > Script file... > select IDAScript.py.

Each time you run IDAScript.py all the .w2i files in the "w2i Files" graphs are colorized in IDA. You can see "Output Window" for more details (e.g functions that changed their colors).

  
  

####     -   Configuration

  
*         Change the color of code coverage graph. (Change the hex number of color). This option is special useful when you want to compare two or more dumps.
  

    	!windbg2ida\_set\_color 0x36AC29

  
  
*         Disable Step in into function calls.
  

    	!windbg2ida\_disable\_stepin

  
  
*         Disable registers in comment of IDA.
  

    	!windbg2ida\_disable\_registers\_in\_comment

  
**For more information about other configs use the !windbg2ida to see the help.**  
  
  
  

####     -   Unload Script

  

      To unload the windbg2ida.js (replace path with your computer path to windbg2ida.js)

    	.scriptunload "C:\\Users\\Sina\\Desktop\\windbg2ida\\windbg2ida.js"

  
  

Pictures
--------

![Windbg2ida](./style/windbg2ida-IDAGraph.png) ![Windbg2ida](./style/windbg2ida-compare-two-scripts.png) ![Windbg2ida](./style/Windbg2ida-windbg.png)

Demo
----

Windbg2ida Help
---------------

Features
--------

Current features :

*   Comparing two or more code coverage files simultaneously
*   Works on both x64 and x86 version of Windbg
*   Show **registers** for each instruction
*   Show **memorry contents** for each instruction
*   Both User-mode and Kernel-mode Compatible
*   Use dump files offline without need to re-run in Windbg
*   Show other modules and invalid addresses
*   etc.

What's new?
-----------

*   Add comparing for two or more files
*   Add read from folders
*   Add registers + eflag read
*   Add branch status show

Todo
----

*   Add Pause when a special value detected for a register
*   Add Pause when a special memory address used in program flow

### Latest News

#### First Version Released

##### Aug 21st, 2019

### Similar Projects

*   [ret-sync](https://github.com/bootleg/ret-sync)
*   [Another Windbg2ida for 32bit only](http://rmadair.github.io/windbg2ida/)
*   [Ablation](https://github.com/cylance/Ablation/)
*   [Integrating WinDbg and IDA for Improved Code Flow Analysis](http://www.exploit-monday.com/2011/07/integrating-windbg-and-ida-for-improved.html)


Contribution
------------

Windbg2ida is maintained by **Sina Karvandi**, you can find me in [Twitter](https://twitter.com/Intel80x86) . If you see any problem or if you need a new feature you can use [Issues](https://github.com/SinaKarvandi/windbg2ida/issues) on GitHub.  
Any Contribution is appreciated.

Windbg2ida is under [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html) - Template of this website comes from [here](http://www.html5webtemplates.co.uk).
