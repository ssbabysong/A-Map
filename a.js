var closelist = new Array(),
openlist = new Array();
var gw = 10,
gh = 10,
gwh = 14;
var p_start = new Array(2),
p_end = new Array(2);
var s_path, n_path = "";
var num, level, flag = 0;
var w = 30,
h = 20;

// 得到周围方块坐标
function GetRound(pos) {
  var a = new Array();
  a[0] = (pos[0] + 1) + "," + (pos[1] - 1);
  a[1] = (pos[0] + 1) + "," + pos[1];
  a[2] = (pos[0] + 1) + "," + (pos[1] + 1);
  a[3] = pos[0] + "," + (pos[1] + 1);
  a[4] = (pos[0] - 1) + "," + (pos[1] + 1);
  a[5] = (pos[0] - 1) + "," + pos[1];
  a[6] = (pos[0] - 1) + "," + (pos[1] - 1);
  a[7] = pos[0] + "," + (pos[1] - 1);
  return a;
}
// 求出节点的f值，s_path[3]是父节点
function GetF(arr) {
  var t, G, H, F;
  for (var i = 0; i < arr.length; i++) {
    t = arr[i].split(",");
    t[0] = parseInt(t[0]);
    t[1] = parseInt(t[1]);
    if (IsOutScreen([t[0], t[1]]) || IsPass(arr[i]) || InClose([t[0], t[1]]) || IsStart([t[0], t[1]]) || !IsInTurn([t[0], t[1]]))
      continue;
    if ((t[0] - s_path[3][0]) * (t[1] - s_path[3][1]) != 0)
      G = s_path[1] + gwh;
    else
      G = s_path[1] + gw;
    if (InOpen([t[0], t[1]])) {
      if (G < openlist[num][1]) {
        openlist[num][0] = (G + openlist[num][2]);
        openlist[num][1] = G;
        openlist[num][4] = s_path[3];
      } else {
        G = openlist[num][1];
      }
    }
    else {
      H = (Math.abs(p_end[0] - t[0]) + Math.abs(p_end[1] - t[1])) * gw;
      F = G + H;
      arr[i] = new Array();
      arr[i][0] = F;
      arr[i][1] = G;
      arr[i][2] = H;
      arr[i][3] = [t[0], t[1]];
      arr[i][4] = s_path[3];
      openlist[openlist.length] = arr[i];
    }
    if (maptt.rows[t[1]].cells[t[0]].style.backgroundColor != "#00eb16" && maptt.rows[t[1]].cells[t[0]].style.backgroundColor != "#ff1900" && maptt.rows[t[1]].cells[t[0]].style.backgroundColor != "#7e7f7f" && maptt.rows[t[1]].cells[t[0]].style.backgroundColor != "#9bf1f0") {
      // maptt.rows[t[1]].cells[t[0]].style.backgroundColor = "#a4f9c3";
      // maptt.rows[t[1]].cells[t[0]].innerHTML="<font color=white>"+G+"</font>";
          }
        }
      }

      function IsStart(arr) {
        if (arr[0] == p_start[0] && arr[1] == p_start[1])
          return true;
        return false;
      }

      function IsInTurn(arr) {
        if (arr[0] > s_path[3][0]) {
          if (arr[1] > s_path[3][1]) {
            if (IsPass((arr[0] - 1) + "," + arr[1]) || IsPass(arr[0] + "," + (arr[1] - 1)))
              return false;
          }
          else if (arr[1] < s_path[3][1]) {
            if (IsPass((arr[0] - 1) + "," + arr[1]) || IsPass(arr[0] + "," + (arr[1] + 1)))
              return false;
          }
        }
        else if (arr[0] < s_path[3][0]) {
          if (arr[1] > s_path[3][1]) {
            if (IsPass((arr[0] + 1) + "," + arr[1]) || IsPass(arr[0] + "," + (arr[1] - 1)))
              return false;
          }
          else if (arr[1] < s_path[3][1]) {
            if (IsPass((arr[0] + 1) + "," + arr[1]) || IsPass(arr[0] + "," + (arr[1] + 1)))
              return false;
          }
        }
        return true;
      }

      function IsOutScreen(arr) {
        if (arr[0] < 0 || arr[1] < 0 || arr[0] > (w - 1) || arr[1] > (h - 1))
          return true;
        return false;
      }

      function InOpen(arr) {
        var bool = false;
        for (var i = 0; i < openlist.length; i++) {
          if (arr[0] == openlist[i][3][0] && arr[1] == openlist[i][3][1]) {
            bool = true;
            num = i;
            break;
          }
        }
        return bool;
      }

      function InClose(arr) {
        var bool = false;
        for (var i = 0; i < closelist.length; i++) {
          if ((arr[0] == closelist[i][3][0]) && (arr[1] == closelist[i][3][1])) {
            bool = true;
            break;
          }
        }
        return bool;
      }

      function IsPass(pos) {
        if ((";" + n_path + ";").indexOf(";" + pos + ";") != -1)
        return true;
        return false;
      }

      function Sort(arr) {
        var temp;
        for (var i = 0; i < arr.length; i++) {
          if (arr.length == 1) break;
          if (arr[i][0] <= arr[i + 1][0]) {
            temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
          }
          if ((i + 1) == (arr.length - 1))
            break;
        }
      }
// 主要的循环函数
function main() {
  GetF(GetRound(s_path[3]));
  Sort(openlist);
  s_path = openlist[openlist.length - 1];
  closelist[closelist.length] = s_path;
  openlist[openlist.length - 1] = null;
  if (openlist.length == 0) {
    alert("找不到路径");
    return;
  }
  openlist.length = openlist.length - 1;
  if ((s_path[3][0] == p_end[0]) && (s_path[3][1] == p_end[1])) {
    maptt.rows[p_end[1]].cells[p_end[0]].style.backgroundColor = "#ff1900";
    getPath();
  } else {
    // maptt.rows[s_path[3][1]].cells[s_path[3][0]].style.backgroundColor = "#9bf1f0";
    setTimeout("main()", 0);
  }
}

function getPath() {
  var str = "";
  var t = closelist[closelist.length - 1][4];
  while (1) {
    str += t.join(",") + ";";
    maptt.rows[t[1]].cells[t[0]].style.backgroundColor = "#ffff00";
    for (var i = 0; i < closelist.length; i++) {
      if (closelist[i][3][0] == t[0] && closelist[i][3][1] == t[1])
        t = closelist[i][4];
    }
    if (t[0] == p_start[0] && t[1] == p_start[1])
      break;
  }
}
// 初始化open closed表
function setPos() {
  closelist = new Array(),
  openlist = new Array();
  s_path = [];

  var h = (Math.abs(p_end[0] - p_start[0]) + Math.abs(p_end[1] - p_start[1])) * gw;
    // 初始化h,g,f值
    s_path = [h, 0, h, p_start, p_start];
  }

// 绘制起点终点障碍物
function set(id, arr) {
  switch (id) {
    case 1:
    p_start = arr;
    maptt.rows[arr[1]].cells[arr[0]].style.backgroundColor = "#00eb16";
    break;
    case 2:
    p_end = arr;
    maptt.rows[arr[1]].cells[arr[0]].style.backgroundColor = "#ff1900";
    break;
    case 3:
    n_path += arr.join(",") + ";";
    maptt.rows[arr[1]].cells[arr[0]].style.backgroundColor = "#7e7f7f";
    break;
    default:
    break;
  }
}
// 重置地图并且初始化
function clear() {
  for (var i = 0; i < h; i++) {
    for (var j = 0; j < w; j++) {
      maptt.rows[i].cells[j].style.backgroundColor = "#fff";
    }
  }
  closelist = new Array(), openlist = new Array();
  p_start = new Array(2), p_end = new Array(2);
  s_path, n_path = "";
  num, flag = 0;
}
// 随机生成地图
function setmap(seed = 0.3) {
  closelist = new Array(), openlist = new Array();
  s_path, n_path = "";
  num, flag = 0;
  for (var i = 0; i < h; i++) {
    for (var j = 0; j < w; j++) {
      arr=[i, j];
      if(!((i==p_start[1]&&j==p_start[0])||(i==p_end[1]&&j==p_end[0]))){
      maptt.rows[i].cells[j].style.backgroundColor = "#fff";
      var level = Math.random();
      if (level < seed) {
        n_path += arr.join(",") + ";";
        maptt.rows[i].cells[j].style.backgroundColor = "#7e7f7f";
      }
    }
    }
  }
}
// 选择设置起点终点障碍物
function setflag(id) {
  flag = id;
}
